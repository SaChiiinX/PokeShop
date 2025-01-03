import { PokemonProps } from "./pokemonProps";

export interface FilterPokemonProps {
    filteredPokemons: PokemonProps[];
    updateFilteredPokemons: (filtered: PokemonProps[]) => void;
  }