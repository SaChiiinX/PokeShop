import { useContext } from "react";
import { authContext } from "../../App";
import { Typography, Stack, Divider, Box } from "@mui/material";

function UserInfo() {
    const auth = useContext(authContext);
    
  if(!auth){
    throw new Error("Authentication missing");
  }
  return (
    <Stack direction="row" spacing={1} sx={{
      flexWrap: 'wrap',
      border: '10px solid #2c3e50',
      borderRadius: '8px', 
      display: 'inline-flex',
      justifyContent: 'space-between'
    }}>
      <Typography sx={{
        fontFamily: '"Varela Round", sans-serif',
        fontWeight: 1000,
        fontSize: '30px',
        color: '#f1e0a1',
        textShadow: '2px 2px 4px #2c3e50, -2px -2px 4px #2c3e50, 2px -2px 4px #2c3e50, -2px 2px 4px #2c3e50',
        padding: '7px'
      }}>
        {auth.username}
      </Typography>
      <Divider orientation="vertical" sx={{ height: '60px', width: '7px', backgroundColor: '#2c3e50', margin: '0px'}} />
      <Box sx={{ display: 'flex'}}>
           <img src="/src/assets/coin.png"
           style={{
           width: '50px',
           height: '40px',
           background: 'none',
           paddingTop: '10px'}}/>
           <Typography variant="body1"
                       sx={{
                        color: '#f1e0a1',
                        fontWeight: 1000,
                        fontSize: '30px',
                        textShadow: '2px 2px 4px #2c3e50, -2px -2px 4px #2c3e50, 2px -2px 4px #2c3e50, -2px 2px 4px #2c3e50',
                        padding: '7px'
                       }}>
                        {auth.coins}
           </Typography>
      </Box>
    </Stack>
  )
}

export default UserInfo