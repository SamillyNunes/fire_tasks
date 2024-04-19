import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { 
    addDoc,
    collection
 } from 'firebase/firestore';

import { auth, db } from '../../firebaseConnection';
import './tasks.css';

function Tasks(){
    const [taskInput, setTaskInput] = useState('');
    const [user, setUser] = useState({});

    useEffect(()=>{
        async function loadUser(){
            const userDetail = localStorage.getItem("firetasks@detailUser");
            setUser(JSON.parse(userDetail));
        }

        loadUser();

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

            <article className='list'>
                <p>Estudar javascript e reactJs</p>

                <div>
                    <button>Editar</button>
                    <button className='btn-delete' >Concluir</button>
                </div>
            </article>

            <button className='btn-logout' onClick={handleLogout} >Sair</button>
        </div>
    );
}

export default Tasks;