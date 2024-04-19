import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { 
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where
 } from 'firebase/firestore';

import { auth, db } from '../../firebaseConnection';
import './tasks.css';

function Tasks(){
    const [taskInput, setTaskInput] = useState('');
    const [user, setUser] = useState({});

    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        async function loadUserAndTasks(){
            const userDetailStorage = localStorage.getItem("firetasks@detailUser");
            const userDetail = JSON.parse(userDetailStorage);
            setUser(userDetail);

            if(userDetail){
                const taskRef = collection(db, "tasks");
                // Esta fazendo uma pesquisa, filtrando por ordem decrescente e apenas os posts do usuario q ta logado
                const q = query(taskRef, orderBy("createdAt", "desc"), where("userUid", "==", userDetail?.uid));
                onSnapshot(q, (snapshot)=>{
                    let tasksList = [];

                    snapshot.forEach((doc)=>{
                        tasksList.push({
                            id: doc.id,
                            task: doc.data().task,
                            userUid: doc.data().userUid,
                        });
                    });

                    console.log(tasksList);

                    setTasks(tasksList);
                });
            }
        }

        loadUserAndTasks();

    }, []);

    async function handleRegister(e){
        e.preventDefault(); //p n atualizar a pagina

        if(taskInput===''){
            alert('Digite sua tarefa!');
            return;
        }

        const collectionRef = collection(db, "tasks");
        await addDoc(collectionRef, {
            task: taskInput,
            createdAt: new Date(),
            userUid: user?.uid
        })
        .then(()=>{
            console.log('Tarefa registrada');
            setTaskInput('');
        })
        .catch(error => {
            console.log('ERRO AO REGISTRAR!');
        });
    }

    async function handleLogout(){
        await signOut(auth);
    }

    return (
        <div className='tasks-container'>
            <h1>Minhas tarefas</h1>

            <form className='form' onSubmit={handleRegister} >
                <textarea
                    placeholder='Digite sua tarefa...'
                    value={taskInput}
                    onChange={(e)=> setTaskInput(e.target.value)}
                />

                <button type='submit' className='btn-register' >Salvar tarefa</button>
            </form>

            {tasks.map((item)=>(
                <article className='list' key={item.id} >
                    <p> {item.task} </p>

                    <div>
                        <button>Editar</button>
                        <button className='btn-delete' >Concluir</button>
                    </div>
                </article>
            ))}

            <button className='btn-logout' onClick={handleLogout} >Sair</button>
        </div>
    );
}

export default Tasks;