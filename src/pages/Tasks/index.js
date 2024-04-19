import { useState } from 'react';
import './tasks.css';

function Tasks(){
    const [taskInput, setTaskInput] = useState('');

    function handleRegister(e){
        e.preventDefault(); //p n atualizar a pagina
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

            <button className='btn-logout' >Sair</button>
        </div>
    );
}

export default Tasks;