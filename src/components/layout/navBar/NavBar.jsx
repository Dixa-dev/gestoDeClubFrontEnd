
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {  Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { useContext } from "react";

const NavBar = () => {

  // const navigate = useNavigate();

  // const { obj } = useContext(ContextGlobal);

  
  return (
    <>
      <AppBar sx={{background:"green"}} position="static">
        <Container >
          <Toolbar sx={{display:"flex", justifyContent:"space-between"}} >
            
            <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <Box sx={{ display: "flex", height:"20vh", alignItems:"center" }}>
            <Box>
              
              <img 
                src="/Logo Beltran.png" 
                alt="Club Logo"
                style={{ height: "16vh" }} 
              />
            </Box>
            
            <Typography variant="h5" sx={{width:"10%",}}>
              Club Cooperativa Beltrán
            </Typography>
            </Box>
            </Link>
            
            <Button color="inherit" sx={{gap:"0.5vw", fontSize:"1.5rem"}}><PersonIcon fontSize="large"/> Login</Button>
           
          </Toolbar>
        </Container>
        <Box sx={{backgroundColor:"white", height:"0.2vh"}}></Box>
        <Box sx={{backgroundColor:"red", height:"3vh"}}></Box>
        
      </AppBar>
      
    </>
  );
};

export default NavBar;
