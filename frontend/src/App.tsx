import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

import './App.css'
import Nav from './components/nav/Nav'
import {User} from './interfaces/user'
import Pokemon_m from './components/Pokemon_m/Pokemon_m'
import Login from './components/login/login'
import { createContext, useContext, useEffect, useState } from 'react'
import User_m from './components/user_m/User_m'
import Shop from "./components/shop-page/Shop";
import CollectionContainer from "./components/collection-page/CollectionContainer";
import { PokemonProvider } from "./context/PokemonContext";



export interface AuthContextType{
  userId : number | null,
  setUserId: (coins: number) => void 
  username: string,
  setUsername: (username: string) => void,
  role: "unauthenticated" | "USER" | "ADMIN",
  setRole: (role: "unauthenticated" | "USER" | "ADMIN") => void
  coins: number,
  setCoins: (coins: number) => void 
}

export const authContext = createContext<AuthContextType | null>(null);

function App() {
  // const navigate = useNavigate();
  const [userId, setUserId] = useState<number | null>(-1);
  const [username, setUsername] = useState<string>('');
  const [role, setRole] = useState<"unauthenticated" | "USER" | "ADMIN">('unauthenticated');
  const [coins, setCoins] = useState<number>(0);

  /*
  useEffect(() => {
    if(!useContext(authContext)){
      navigate("/login");
    }
  }, [useContext(authContext), navigate]);
  */

 

  return (
    <authContext.Provider value={
      {
        userId,
        setUserId,
        username,
        setUsername,
        role,
        setRole,
        coins,
        setCoins,
      }
    }>
    <PokemonProvider>
      <BrowserRouter>
      <Nav />
      
      <Routes>
        <Route path="/" element />
        <Route path='/login-register' element={<Login />} />
        <Route path='/pokemon-management' element={<Pokemon_m/>} />
        <Route path='/user-management' element={<User_m />} />
        <Route path='/user-management' element />
        <Route path='/collection' element={<CollectionContainer/>}/>
        <Route path='/shop' element={<Shop/>}/>
      </Routes>

      </BrowserRouter>
      </PokemonProvider>
    </ authContext.Provider>
  )
}

export default App