import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: 'url("/fondo_club-Beltran.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(8px)",
          zIndex: -1,
        }}
      />

      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            paddingTop: "10vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "75%",
              alignItems: "center",
              padding: "2rem",
              borderRadius: "10px",
              backgroundColor: {
                xs: "rgba(255, 255, 255, 0.7)", 
                md: "transparent", 
              },
              color: {
                xs: "green", 
                md: "white", 
              },
            }}
          >
            <Typography
              variant="h1"
              sx={{ fontWeight: "950", fontSize: { xs: "1.9em", md: "6rem" } }}
            >
              Bienvenidos a la web de la Coop!!
            </Typography>
            <Typography
              variant="h4"
              sx={{ marginTop: "3vh", marginBottom: { xs: "2vh", md: "5vh" }, fontSize: { xs: "1rem", md: "2rem" } }}
            >
              Una familia, un club, la misma pasión
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: "1.5vh", fontSize: { xs: "1rem", md: "1.5rem" }  }}>
              ¿Sos jugador?
            </Typography>
            <Link to={"/register"}>
              <Button
                sx={{
                  color: "white",
                  backgroundColor: "green",
                  height: { xs: "2.5rem", md: "7vh" },
                  width: { xs: "25vw", md: "10vw" },
                  fontSize: { xs: "0.7rem", md: "1rem" },
                }}
              >
                Registrate
              </Button>
            </Link>
           
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
