import { BrowserRouter, Route, Routes} from 'react-router-dom'

import './App.css'
import Nav from './components/nav/Nav'
import { createContext, useState } from 'react'
import Shop from "./components/shop-page/Shop";
import CollectionContainer from "./components/collection-page/CollectionContainer";
import { PokemonProvider } from "./context/PokemonContext";
import PokemonManagement from "./components/pokemon-management/PokemonManagement";
import UserManagement from "./components/user-management/UserManagement";
import LoginRegister from "./components/login/LoginRegister";



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
  const [userId, setUserId] = useState<number | null>(-1);
  const [username, setUsername] = useState<string>('');
  const [role, setRole] = useState<"unauthenticated" | "USER" | "ADMIN">('unauthenticated');
  const [coins, setCoins] = useState<number>(0);

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
      <Nav/>
      <Routes>
        <Route path="/" element />
        <Route path='/login-register' element={<LoginRegister />} />
        <Route path='/pokemon-management' element={<PokemonManagement/>} />
        <Route path='/user-management' element={<UserManagement />} />
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