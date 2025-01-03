import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authContext } from "../App";
import axios from "axios";
import { Pokemon } from "../interfaces/pokemon";
import { PokemonProps } from "../interfaces/pokemonProps";
import { PokemonContextType } from "../interfaces/pokemonContextType";

const PokemonContext = createContext<PokemonContextType>({pokemonPropsList: []});

export const usePokemon = () => {
  return useContext(PokemonContext);
};

export const PokemonProvider = ({ children} : React.PropsWithChildren) => {
  const auth = useContext(authContext);
  const [acquiredList, setAcquiredList] = useState([]);
  const [unacquiredList, setUnacquiredList] = useState([]);
  
  // Get the lists of pokemons the user has acquired and has not acquired (WHEN THEY LOGIN)
  useEffect(() => {
    axios.get('http://localhost:8080/users/pokemons?status=acquired', { withCredentials: true })
      .then((res) => setAcquiredList(res.data));
    axios.get('http://localhost:8080/users/pokemons?status=unacquired', { withCredentials: true })
      .then((res) => setUnacquiredList(res.data));
  }, [auth?.userId, auth?.coins]);

  // Maps pokemons to pokemonProps
  const mapPokemonList = (pokemonList:Pokemon[], owned:boolean, variant:string) : PokemonProps[] => pokemonList.map((p) => ({
    id: p.pokemonId,
    name: p.name,
    type1: p.type1,
    type2: p.type2,
    imgUrl: p.imgUrl,
    cost: p.cost,
    owned,
    variant,
  }) as PokemonProps);

  // Intialize both lists
  const aList = mapPokemonList(acquiredList, true, 'collection');
  const bList = mapPokemonList(unacquiredList, false, 'collection');

  // Combine and sort by pokemonProps Id
  const pokemonPropsList = useMemo(() => {
    const combinedList = [...aList, ...bList];
    return combinedList.sort((a, b) => a.id - b.id);
  }, [aList, bList]);

  return (
    <PokemonContext.Provider value={{ pokemonPropsList }}>
      {children}
    </PokemonContext.Provider>
  );
};