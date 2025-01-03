import { useContext } from "react";
import { authContext } from "../../App";
import { PokemonProps } from "../../interfaces/pokemonProps";
import { Card, CardMedia, CardContent, Typography, Button, Stack, Box } from "@mui/material";
import axios from "axios";
import { User } from "../../interfaces/user";

function Pokemon(props: PokemonProps) {
    const auth = useContext(authContext);
    if(!auth){
        throw new Error("Authentication missing");
    }

    const handleBuyClick = async (pokemonId: number, cost: number) => {
        axios.get<User>("http://localhost:8080/users/id", {withCredentials:true}
        ).then((res) => {
            const user = res.data;
            user.coins = user.coins - cost;
            axios.post(`http://localhost:8080/users/pokemons?pokemonId=${pokemonId}`, {},{withCredentials:true}
            ).then(() => {
                axios.put<User>("http://localhost:8080/users/edituser", user, {withCredentials:true}
                ).then((res) => auth.setCoins(res.data.coins)).catch(() => console.log("Update was not succesful"))
            }).catch((error) => console.log("Something went wrong when updating user-pokemon relatioinship", error))
        }).catch(() => console.log("Unable to Buy Pokemon"))
    }
    
    if (props.variant === "management") {
        return null;
    }

    if (props.variant === "shop") {
        return (
            <Card sx={{
                objectFit: 'contain',
                maxWidth: 250,
                background: 'linear-gradient(135deg, #2c3e50, #34495e)',
                borderRadius: '8px',
                border: '2px solid #1c1c1c',
                boxShadow: 3,
                position: 'relative',
                margin: '15px',
                '&:hover': {
                    transform: 'scale(1.05)',
                    border: '3px solid #ff6f61'
                }}}>
                <CardMedia
                    sx={{
                        height: 200,
                    }}
                    image={props.imgUrl}/>
                <CardContent>
                    <Typography gutterBottom variant="h5"
                        component="div"
                        sx={{
                            textAlign: 'center',
                            fontFamily: '"Varela Round", sans-serif',
                            fontWeight: 'bold',
                            color: '#e74c3c'
                        }}>
                        {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
                    </Typography>
                    <Stack direction="row" spacing={1} justifyContent="center" sx={{ width: "100%" }}>
                        <img
                            key={`${props.name}-${props.type1}`}
                            src={`src/assets/types/${props.type1.toLowerCase()}.png`}
                            style={{ width: 75, height: 20 }}
                        />
                        {props.type2 && <img
                            key={`${props.name}-${props.type2}`}
                            src={`src/assets/types/${props.type2.toLowerCase()}.png`}
                            style={{ width: 75, height: 20 }}
                        />}
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center" margin={'10px'}>
                        <Button variant="contained"
                                sx={{
                                    width: '100px',
                                    backgroundColor: '#f1e0a1', 
                                    color: '#2c3e50', 
                                    '&:hover': {
                                        backgroundColor: '#f2d94f'
                                    }}}
                                onClick ={() => handleBuyClick(props.id, props.cost)}
                                disabled={auth.coins < props.cost || props.owned}>
                            {props.owned ? "Owned" : "Buy"}
                        </Button>
                        <Box sx={{ display: 'flex'}}>
                            <img src="/src/assets/coin.png"
                                 style={{
                                    width: '30px',
                                    height: '30px', 
                                    background: 'none'}}/>
                            <Typography variant="body1"
                                        color= '#f1e0a1'>
                                {props.cost}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        );
    }

    if (props.variant === "collection") {
        return (
            <Card sx={{
                objectFit: 'contain',
                maxWidth: 250,
                background: 'linear-gradient(135deg, #2c3e50, #34495e)',
                borderRadius: '8px',
                border: '2px solid #1c1c1c',
                boxShadow: 3,
                position: 'relative',
                opacity: props.owned ? 1 : 0.2,
                margin: '15px'}}>
                <CardMedia
                    sx={{
                        height: 200,
                    }}
                    image={props.imgUrl}/>
                <CardContent>
                    <Typography gutterBottom variant="h5"
                        component="div"
                        sx={{
                            textAlign: 'center',
                            fontFamily: '"Varela Round", sans-serif',
                            fontWeight: 'bold',
                            color: '#e74c3c',
                        }}>
                        {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
                    </Typography>
                    <Stack direction="row" spacing={1} justifyContent="center" sx={{ width: "100%" }}>
                        <img
                            key={`${props.name}-${props.type1}`}
                            src={`src/assets/types/${props.type1.toLowerCase()}.png`}
                            style={{ width: 75, height: 20 }}
                        />
                        {props.type2 && <img
                            key={`${props.name}-${props.type2}`}
                            src={`src/assets/types/${props.type2.toLowerCase()}.png`}
                            style={{ width: 75, height: 20 }}
                        />}
                    </Stack>
                </CardContent>
            </Card>
        );
    }
}

export default Pokemon;