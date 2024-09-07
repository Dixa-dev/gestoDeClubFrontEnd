
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {  Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <AppBar sx={{background:"green"}} position="static">
        <Container >
          <Toolbar sx={{display:"flex", }} >
            
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
            
          </Toolbar>
        </Container>
        <Box sx={{backgroundColor:"red", height:"3vh"}}></Box>
      </AppBar>
      
    </>
  );
};

export default NavBar;
