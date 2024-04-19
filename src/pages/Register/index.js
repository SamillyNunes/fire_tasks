import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebaseConnection";
import { toast } from "react-toastify";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleRegister(event){
      // Pra prevenir de atualizar a pagina
      event.preventDefault();

      if(email!=='' && password!==''){
        await createUserWithEmailAndPassword(auth, email, password)
        .then(()=>{
          navigate('/tasks', {replace: true});
        })
        .catch(error => {
          toast.error('Erro ao fazer o cadastro. Tente novamente em instantes.');
        });
      } else {
        toast.warning('Preencha todos os campos!');
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
  