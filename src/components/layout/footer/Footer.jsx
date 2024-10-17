import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Link } from "react-router-dom";

const Footer = () => {

  
  return (
    <>
      <AppBar
        sx={{ background: "#00800080", }}
        position="static"
      >
        <Box sx={{ backgroundColor: "#ff00008f", height: "3vh" }}></Box>
        <Box sx={{ backgroundColor: "white", height: "0.3vh" }}></Box>

        <Container>
          <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex", height: "10vh", alignItems: "center" }}>
              <Box>
                <img
                  src="/Logo Beltran.png"
                  alt="Club Logo"
                  style={{ height: "8vh" }}
                />
              </Box>

              <Typography
                 
                 sx={{
                   ml: 1,
                   width:"80%", // Margen izquierdo para espaciar la imagen y el texto
                   fontSize:{xs:"0.75rem", md:"1.45rem"}
                 }}
               >Club Cooperativa Beltrán</Typography>
            </Box>
          </Toolbar>

          <Box sx={{ display: "flex", justifyContent: "center", gap: "8vw" }}>
            <Link
              to={
                "https://www.instagram.com/clubcoopbeltran?igsh=bXFkNjJqNjB1cHY1"
              }
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <InstagramIcon />
            </Link>
            <Link
              to={"https://www.facebook.com/ClubCoopBeltran"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <FacebookIcon />
            </Link>
            <Link
              to={
                "https://www.instagram.com/clubcoopbeltran?igsh=bXFkNjJqNjB1cHY1"
              }
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <XIcon />
            </Link>
          </Box>

          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "6vh",
              fontSize:{xs:"0.68rem", md:"1.3rem"}
            }}
          >
            2024 <CopyrightIcon /> - Club Cooperativa Beltran todos los derechos
            reservados
          </Typography>
        </Container>
      </AppBar>
    </>
  );
};

export default Footer;
