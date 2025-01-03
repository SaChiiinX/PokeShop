import { PokemonContextType } from "../../interfaces/pokemonContextType";
import { usePokemon } from "../../context/PokemonContext";
import UserInfo from "./UserInfo";
import { PokemonProps } from "../../interfaces/pokemonProps";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pokemon as PokemonInterface} from "../../interfaces/pokemon";
import Pokemon from "../pokemon/Pokemon";
import { Box, Grid2, Typography } from "@mui/material";


function Shop() {
  const {pokemonPropsList}: PokemonContextType = usePokemon();
  const [shopItems, updateShopItems] = useState<PokemonProps[]>([])

  useEffect(() => {
    axios.get<PokemonInterface[]>("http://localhost:8080/users/shop/shop-items",
      {withCredentials:true}
    ).then((res) => {
      const shopPokemons = res.data.map((pokemon: PokemonInterface) => pokemon.pokemonId);
      const shopPokemonProps = pokemonPropsList.filter((pokemonProp) =>
        shopPokemons.includes(pokemonProp.id)
      );
      updateShopItems(shopPokemonProps);
    }).catch(error => console.log("Could not get pokemonProps List", error))
  }, [shopItems])


  return (
    <Box sx={{ 
      backgroundColor: '#e0e0e0', // Light gray background
      minHeight: '100vh', // Ensure it covers the full height of the viewport
      padding: '20px'}}>
      <UserInfo/>
      <Box sx={{ 
        marginTop: '30px',
        marginBottom: '20px',
        display: 'flex', 
        justifyContent: 'center',  // Center horizontally
        alignItems: 'center',      // Center vertically (if needed)
        width: '100%'  
      }}>
      <Typography
          variant="h2"
          sx={{
            fontFamily: '"Varela Round", sans-serif',
            fontWeight: 700,
            fontSize: '72px',
            color: '#e74c3c',
            textAlign: 'center',
            textShadow: '4px 4px 8px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(135deg, #e74c3c, #ff6f61)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            display: 'inline-block',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: '#fff', // Change text color to white on hover
              transform: 'scale(1.3)', // Slightly increase the size on hover for emphasis
              textShadow: '4px 4px 12px rgba(0, 0, 0, 0.8)', // Enhanced shadow on hover for a glowing effect
            },
            }}>
        Daily Shop
      </Typography>
      </Box>
      <Grid2 container spacing={2} sx={{
        border: '7px solid #2c3e50',
        borderRadius: '15px',
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)',
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '16px',
        }}>
        {shopItems.map((p) => (
          <Grid2 key={p.id} sx={{
              display: 'flex', 
              flexDirection: 'column',
          }}>
          <Pokemon {...p} variant="shop" />
          </Grid2>))}
      </Grid2>
    </Box>
  );
}

export default Shop