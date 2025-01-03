import { useState } from "react";
import { usePokemon } from "../../context/PokemonContext";
import { PokemonContextType } from "../../interfaces/pokemonContextType";
import { PokemonProps } from "../../interfaces/pokemonProps";
import CollectionPokemons from "./CollectionPokemons";
import Filters from "./Filters";
import { Box } from "@mui/material";

function Collection() {
  const { pokemonPropsList } : PokemonContextType = usePokemon();
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonProps[]>(pokemonPropsList);

  const updateFilteredPokemons = (filtered: PokemonProps[]) => {
    setFilteredPokemons(filtered);
  };

  const filterPokemonProps = {
    filteredPokemons,
    updateFilteredPokemons
  };

  return (
    <Box sx={{
      backgroundColor: '#e0e0e0',
    }}>
      <Filters {...filterPokemonProps}/>
      <CollectionPokemons {...filterPokemonProps}/>
    </Box>
  );
}

export default Collection
