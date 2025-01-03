import axios from 'axios';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { authContext } from '../../App';
import { User } from '../../interfaces/user';

function Logout() {
    const auth = useContext(authContext)

    useEffect(()=>{
        if(auth?.username){
            axios
            .post("http://localhost:8080/users/logout", {})
            .then((res=>{
                auth.setUsername("")
                auth.setRole("unauthenticated")
                alert(`Logout successfully for the username: ${auth?.username}  Role: ${auth?.role} `)
            }))
            .catch((err)=>{
                alert(`Cannot logout for the username: ${auth?.username}  Role: ${auth?.role}. erro: ${err.message} `)
            })
        }else{
            alert("Login user is null.")
        }

        
    }, [])

  return (
    <></>
  )
}

export default Logout