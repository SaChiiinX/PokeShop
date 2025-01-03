import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.module.css';
import axios from 'axios';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { authContext } from '../../App';
import { User } from '../../interfaces/user';

function Nav() {
  const auth = useContext(authContext)

  let Logout = ()=>{
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
  }

  return (
    <nav>
        <ul className={styles.ul}>
            <li className={styles.li}><Link to="/">Home</Link></li>
            <li className={styles.li}><Link to="/login-register">Login/Register</ Link></li>
            {auth?.username && <li className={styles.ul}><button type="button"  onClick={Logout}>Logout</button></li>} 
            {auth?.role === "ADMIN" && <li className={styles.li}><Link to="/pokemon-management">Pokemon Management</ Link></li>} 
            {auth?.role === "ADMIN" && <li className={styles.li}><Link to="/user-management">User Management</ Link></li>}
            {auth?.role === "USER" && <li className={styles.li}><Link to="/collection">Collection</Link></li>}
            {auth?.role === "USER" && <li className={styles.li}><Link to="/shop">Shop</Link></li>}
        </ul>
    </nav>
  )
}

export default Nav