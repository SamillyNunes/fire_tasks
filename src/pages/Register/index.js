import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleRegister(event){
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
        
        <h1>Cadastre-se</h1>
        <span>Vamos criar sua conta</span>

        <form className="form" onSubmit={handleRegister} >
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

          <button type="submit" >Cadastrar</button>
        </form>

        <Link className="button-link" to="/" >Já possui uma conta? Faça o login</Link>

      </div>
    );
  }
  
  export default Register;
  