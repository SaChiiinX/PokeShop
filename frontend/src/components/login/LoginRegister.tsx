import axios from 'axios';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { authContext } from '../../App';
import { User } from "../../interfaces/user";
import { FormControl, FormHelperText, Button, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";


function Login() {
    const auth = useContext(authContext)
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    let login = () => {
        if (!username){
            alert("Please enter a username")
            return;
        }

        if(!password){
            alert("Please enter a password")
            return;
        }

        axios.post("http://localhost:8080/users/login", 
            {username, password},
            {withCredentials: true}
        ).then((res) => {
            console.log(res.data)
            auth?.setUserId(res.data.userId)
            auth?.setUsername(res.data.username)
            auth?.setRole(res.data.role)
            auth?.setCoins(res.data.coins)
            alert(`Login successfully.  UserId: ${res.data.userId} Username: ${res.data.username}   Role: ${res.data.role}  Coints: ${res.data.coins}`)
            if(res.data.role === "ADMIN"){
                navigate("/pokemon-management")
            }else{
                navigate("/shop")
            }
        }).catch((err) => {
            console.log("Cannot login: " + err)
        })
    }

    let register = () => {

        if (!username){
            alert("Please enter a username")
            return;            
        }

        if(!password){
            alert("Please enter a password")
            return;
        }
    
        let newUser: User = { 
            userId: null,
            username: username,
            password: password,
            role: "USER",
            coins: 0,
            lastLogin: null
        }
    
        axios.post("http://localhost:8080/users/register", 
            newUser,
            {withCredentials: true}
        ).then((res) => {
            alert(`Registration successfully. Username: ${res.data.username}   Role: ${res.data.role}`)
            setUsername("")
            setPassword("")
        }).catch((err) => {
            console.log("Cannot login: "+err)
        })
    }

  

    useEffect(()=>{
        console.log("Current Logged in User:")
        console.log(auth?.username)
        console.log(auth?.role)
        console.log(auth?.userId)
        console.log(auth?.coins)
    }, [])



  return (
    <Box display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="80vh">
    <FormControl style={{width: "700px",
                         border: "3px solid black",
                         borderRadius: "5px"
                        }}>
        <Box display="flex" gap={2} padding={2} justifyContent={"center"} flexDirection="row">
            <TextField 
                label="Username" 
                id="username" 
                helperText="Please enter a username"
                fullWidth
                style={{ flex: 1 }}
                onChange={(e:SyntheticEvent) => { setUsername((e.target as HTMLInputElement).value)}}
            />
            <Box style={{ flex: 1 }}>
                <TextField 
                    label="Password" 
                    id="password" 
                    type="password"
                    fullWidth
                    onChange={(e:SyntheticEvent) => { setPassword((e.target as HTMLInputElement).value)}}
                />
                <FormHelperText component="div">
                    Password must:
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        <li>Be at least 8 characters</li>
                        <li>Contain at least one number</li>
                        <li>Contain one uppercase letter</li>
                        <li>Contain one lowercase letter</li>
                        <li>Contain one special character</li>
                    </ul>
                </FormHelperText>
            </Box>
        </Box>
        <Box display="contents" justifyContent="center">
            <Button style={{margin:"10px"}} variant="contained" onClick={login}>Login</Button>
            <Button style={{margin:"10px"}} variant="contained" onClick={register}>Register</Button>
        </Box>
    </FormControl>
    </Box>
  )
}

export default Login