import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { Pokemon } from "../../interfaces/pokemon";
import { usePokemon } from "../../context/PokemonContext";
import { FilterPokemonProps } from "../../interfaces/FilterPokemonProps";
import './Filters.css'
import { Box, Button, Checkbox, FormControl, FormControlLabel, ListItemText, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";

const types: string[] = [
  "NORMAL", "FIRE", "WATER", "ELECTRIC", "GRASS", "ICE", "FIGHTING",
  "POISON", "GROUND", "FLYING", "PSYCHIC", "BUG", "ROCK", "GHOST",
  "DRAGON", "DARK", "STEEL", "FAIRY", "STELLAR"
];

function Filters({ updateFilteredPokemons }: FilterPokemonProps) {
  const { pokemonPropsList } = usePokemon() || { pokemonPropsList: [] };
  const [query, setQuery] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<"acquired" | "unacquired" | null>(null);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      axios.get<Pokemon[]>(`http://localhost:8080/users/pokemons?name=${query}`,
        { withCredentials: true }
      ).then((res) => {
        const fetchedPokemonIds = res.data.map((pokemon: Pokemon) => pokemon.pokemonId);
        const filterPokemonProps = pokemonPropsList.filter((pokemonProp) =>
          fetchedPokemonIds.includes(pokemonProp.id)
        );
        updateFilteredPokemons(filterPokemonProps);
      }).catch(error => console.log("Could not get pokemonProps List from INPUT-FILTER", error))
    }
  };

  const handleFilterChange = () => {
    const selectedTypesArray = selectedTypes.join(",");
    const params: { [key: string]: string } = {};

    if (selectedTypesArray) {
      params.types = selectedTypesArray;
    }

    if (selectedStatus) {
      params.status = selectedStatus;
    }

    axios.get<Pokemon[]>("http://localhost:8080/users/pokemons", {
      params,
      withCredentials: true,
    }).then((res) => {
      const fetchedPokemonIds = res.data.map((pokemon) => pokemon.pokemonId);
      const filteredPokemonProps = pokemonPropsList.filter((pokemonProp) =>
        fetchedPokemonIds.includes(pokemonProp.id)
      );
      updateFilteredPokemons(filteredPokemonProps); 
    }).catch((error) => (console.log("Error fetching Pokémon with selected filters", error)))
  };

  const handleSelectChange = (e: SelectChangeEvent<string[]>) => {
    const selectedValues = e.target.value as string[]; // Safely cast value to string[]
    setSelectedTypes(selectedValues);
    setQuery("");
  };

  const handleRadioChange = (status: SetStateAction<"acquired" | "unacquired" | null>) => {
    setSelectedStatus(status === selectedStatus ? null : status);
    setQuery("");
  }

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const renderSelectedText = () => {
    if (selectedTypes.length === 0) {
      return "Show Items"; 
    }
    return `${selectedTypes.length} Type${selectedTypes.length > 1 ? 's' : ''} Selected`; // Text for selected types
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedTypes, selectedStatus]);

  return (
    
    <Box sx={{
      backgroundColor: '#e0e0e0',
      border: '5px solid #2c3e50',
      borderRadius: '8px', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      width: '97%',
      background: '#2c3e50',

    }}>
    <Box sx={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      display: 'inline-flex',
      width: '100%',

    }}>
      <TextField
        type="text"
        placeholder="Type Pokémon's Name"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedStatus(null);
          setSelectedTypes([]);}}
        onKeyDown={handleKeyDown}
        variant="outlined"
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
          '& fieldset': {
              border: 'none'}},
          '& .MuiOutlinedInput-root .MuiInputBase-input': {
              color: '#e0e0e0'},
          '& .MuiOutlinedInput-root .MuiInputBase-input::placeholder': {
              color: '#e0e0e0'},
          color: '#e0e0e0',
          height: '100%',
          width: '400px',
          backgroundColor:  '#2c3e50'}}/>
        
        <Select multiple
                value={selectedTypes}
                onChange={handleSelectChange}
                autoWidth
                onOpen={handleDropdownOpen}
                onClose={handleDropdownClose}
                displayEmpty={true}
                renderValue={() => <span style={{color: '#e0e0e0'}}>
                  {isDropdownOpen ? "Hide Types" : "Show Types"}
                </span>}
                sx={{
                  boxShadow: 'none',
                  border:"none",
                  borderRadius: "0",
                  backgroundColor:'#2c3e50',
                  '.MuiOutlinedInput-notchedOutline': { border: 0 }
                }}>
            {types.map((type) => (
              <MenuItem 
                key={type}
                value={type}
                selected={selectedTypes.includes(type)}
                sx={{
                  backgroundColor: selectedTypes.includes(type) ? '#f1e0a1' : 'transparent',}}>
                {type}
              </MenuItem>
            ))}
        </Select>
        <Radio
          name="checkbox"
          value="acquired"
          checked={selectedStatus==="acquired"}
          onClick={() => handleRadioChange("acquired")}
          readOnly
          sx={{
            borderRadius: '0px',
            backgroundColor: '#2c3e50',
            color: '#e0e0e0',
            padding: "12px",
            '&:hover': {
              backgroundColor: '#2c3e50',
            }
          }}
        />
        <Typography
          sx={{
            fontFamily: '"Varela Round", sans-serif',
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#2c3e50',
            color: '#e0e0e0',
            padding: "10px"
          }}
        >acquired</Typography>
        <Radio
          name="checkbox"
          value="unacquired"
          checked={selectedStatus==="unacquired"}
          onClick={() => handleRadioChange("unacquired")}
          readOnly
          sx={{
            borderRadius: '0px',
            backgroundColor: '#2c3e50',
            color: '#e0e0e0',
            padding: "12px",
            '&:hover': {
              backgroundColor: '#2c3e50',
            }
          }}
        />
        <Typography
          sx={{
            fontFamily: '"Varela Round", sans-serif',
            backgroundColor: '#2c3e50',
            color: '#e0e0e0',
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'center',
            padding: "10px"
          }}
        >unacquired</Typography>

    </Box>
    </Box>
  );
}

export default Filters;
