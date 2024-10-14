import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Button, Typography, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useContext, useState } from "react";
import { ContexGlobal } from "../../../utils/globalContext";

const NavBar = () => {
  const { obj } = useContext(ContexGlobal);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); // Estado para controlar el menú

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Abre el menú al hacer clic en el ícono en pantallas pequeñas
  };

  const handleCloseMenu = () => {
    setAnchorEl(null); // Cierra el menú
  };

  const handleLogout = () => {
    obj.handleLogout();
    navigate("/");
    handleCloseMenu(); // Cierra el menú después de cerrar sesión
  };

  return (
    <>
      <AppBar sx={{ background: "green" }} position="static">
        <Container>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "15vh" }}>
            <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src="/Logo Beltran.png"
                  alt="Club Logo"
                  sx={{
                    height: { xs: "10vh", md: "12vh" }, // Ajustes responsivos para el logo
                    width: "auto", // Mantener la proporción
                    maxWidth: "100%", // Evitar que el logo crezca demasiado
                    objectFit: "contain", // Asegurar que el logo no se deforme
                  }}
                />
                <Typography
                  sx={{
                    ml: 1,
                    width: "10%", // Margen izquierdo para espaciar la imagen y el texto
                    fontSize: { xs: "0.75rem", md: "1.5rem" },
                  }}
                >
                  Club Cooperativa Beltrán
                </Typography>
              </Box>
            </Link>
            {obj.isLoggedIn ? (
              <>
                {/* Pantallas pequeñas: Mostrar solo el ícono con el menú desplegable */}
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                  <Button
                    onClick={handleMenuClick}
                    color="inherit"
                    sx={{ gap: "0.5vw", fontSize: { xs: "3vw", sm: "4vw" } }} // Tamaño de fuente responsivo usando vw
                  >
                    <PersonIcon fontSize="large" />
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={handleLogout}>Log out</MenuItem>
                  </Menu>
                </Box>

                {/* Pantallas medianas y grandes: Mostrar ícono y texto "Log out" */}
                <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
                  <Button
                    onClick={handleLogout}
                    color="inherit"
                    sx={{ gap: "0.5vw", fontSize: { md: "1.3vw" } }}
                  >
                    <PersonIcon fontSize="large" />
                    Log out
                  </Button>
                </Box>
              </>
            ) : (
              <Link to={"/login"} style={{ textDecoration: "none", color: "inherit" }}>
                <Button color="inherit" sx={{ gap: "0.5vw", fontSize: { xs: "3vw", md: "1.3vw" } }}>
                  <PersonIcon fontSize="large" /> Login
                </Button>
              </Link>
            )}
          </Toolbar>
        </Container>
        <Box sx={{ backgroundColor: "white", height: "0.2vh" }}></Box>
        <Box sx={{ backgroundColor: "red", height: "3vh" }}></Box>
      </AppBar>
    </>
  );
};

export default NavBar;
