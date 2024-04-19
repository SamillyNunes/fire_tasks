import { useState } from "react";
import './login.css';
import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(event){
      // Pra prevenir de atualizar a pagina
      event.preventDefault();

      if(email!=='' && password!==''){
        alert('Boa')
      } else {
        alert('Preencha todos os campos')
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
            autoComplete={false}
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
  