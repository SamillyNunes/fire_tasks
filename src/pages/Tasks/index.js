import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { 
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc
 } from 'firebase/firestore';

import { auth, db } from '../../firebaseConnection';
import './tasks.css';
import { toast } from 'react-toastify';

function Tasks(){
    const [taskInput, setTaskInput] = useState('');
    const [user, setUser] = useState({});
    const [editingTask, setEditingTask] = useState({});

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
            toast.warning('Digite sua tarefa!');            
            return;
        }

        if(editingTask?.id){
            handleUpdateTask();
            return;
        }

        const collectionRef = collection(db, "tasks");
        await addDoc(collectionRef, {
            task: taskInput,
            createdAt: new Date(),
            userUid: user?.uid
        })
        .then(()=>{
            toast.success('Tarefa registrada');
            setTaskInput('');
        })
        .catch(error => {
            toast.error('Algo inesperado aconteceu');
        });
    }

    async function handleLogout(){
        await signOut(auth);
    }

    async function deleteTask(id){
        const docRef = doc(db, "tasks", id);
        await deleteDoc(docRef)
        .then(()=>{
            toast.success('Tarefa deletada com sucesso!');
        })
        .catch(error => {
            toast.error('Erro ao deletar tarefa');
        })
    }

    function editTask(item){
        setTaskInput(item.task);
        setEditingTask(item);
    }

    async function handleUpdateTask(){
        console.log('### EDITANDO TAREFA');
        console.log(editingTask);
        
        const docRef = doc(db, "tasks", editingTask?.id);

        await updateDoc(docRef, {
            task: taskInput
        })
        .then(()=>{
            toast.success('Tarefa atualizada com sucesso!');
        })
        .catch(error => {
            toast.error('Erro ao atualizar');
        });

        
        setTaskInput('');
        setEditingTask({});

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

                <button type='submit' className='btn-register' > 
                    {Object.keys(editingTask).length>0 ? 'Atualizar tarefa' : 'Salvar tarefa'}
                </button>
            </form>

            {tasks.map((item)=>(
                <article className='list' key={item.id} >
                    <p> {item.task} </p>

                    <div>
                        <button onClick={()=> editTask(item)} >Editar</button>
                        <button onClick={()=> deleteTask(item.id)} className='btn-delete' >Concluir</button>
                    </div>
                </article>
            ))}

            <button className='btn-logout' onClick={handleLogout} >Sair</button>
        </div>
    );
}

export default Tasks;