import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

import { auth } from "../firebaseConnection";

/// Rota de bloqueio que so deixara passar caso esteja logado
export default function Private({ children }){
    
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(()=>{
        
        async function checkLogin(){
            onAuthStateChanged(auth, (user)=> {
                if(user){
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }

                    localStorage.setItem('firetasks@detailUser', JSON.stringify(userData));

                    setLoading(false);
                    setSigned(true);

                } else {
                    setLoading(false);
                    setSigned(false);
                }
            });
        }

        checkLogin();

    },[]);

    
    if(loading){
        return (
            <div></div>
        );
    }

    if(!signed){
        // se ele ta acessando aqui e n ta logado, manda de volta pro login
        return <Navigate to="/" />
    }

    return children;
}