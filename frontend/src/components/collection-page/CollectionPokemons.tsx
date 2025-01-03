import { Box, Grid2 } from "@mui/material";
import { FilterPokemonProps } from "../../interfaces/FilterPokemonProps";
import { PokemonProps } from "../../interfaces/pokemonProps";
import Pokemon from "../pokemon/Pokemon";

function CollectionPokemons({filteredPokemons}: FilterPokemonProps) {
  return (
    <Box sx={{ 
      backgroundColor: '#e0e0e0',
      minHeight: '100vh',
      padding: '20px'}}>
    <Grid2
    container
    spacing={2}
    sx={{
      border: '6px solid #2c3e50',
      borderRadius: '15px',
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '16px',
      padding: '16px',
      minHeight: '600px'
      }}>
        {filteredPokemons.map((p: PokemonProps) => (
          <Grid2
          key={p.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Pokemon {...p} />
          </Grid2>))}
    </Grid2>
    </Box>
  );
}

export default CollectionPokemons;
