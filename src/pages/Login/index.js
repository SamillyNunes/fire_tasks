import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

import './login.css';
import { auth } from '../../firebaseConnection';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleLogin(event){
      // Pra prevenir de atualizar a pagina
      event.preventDefault();

      if(email!=='' && password!==''){
        await signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
          navigate('tasks', {replace: true});
        })
        .catch(error => {
          toast.error('Usuário não encontrado.');
        });

      } else {
        toast.warning('Preencha todos os campos!');
      }
    }

    return (
      <div className="login-container" >
        
        <h1>Lista de tarefas</h1>
        <span>Gerencie sua agenda de forma fácil.</span>

        <form className="form" onSubmit={handleLogin} >
          <input
            type="email"
            placeholder="Digite seu email:" 
            value={email}
            onChange={(v)=> setEmail(v.target.value)} 
          />

          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(v)=> setPassword(v.target.value)} 
          />

          <button type="submit" >Acessar</button>
        </form>

        <Link className="button-link" to="/register" >Não possui uma conta? Cadastre-se</Link>

      </div>
    );
  }
  
  export default Login;
  