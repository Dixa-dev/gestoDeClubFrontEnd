import {
  Box,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminComision = () => {
  const [events, setEvents] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [open, setOpen] = useState(false);

  const url = "https://gestor-de-club.vercel.app/api/eventos";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitulo("");
  };

  const handleSubmit = () => {
    const createEvent = {
      titulo,
    };

    axios
      .post(url, createEvent)
      .then((response) => {
        toast.success("Evento registrado correctamente");
        handleClose(); // Cerrar modal después de enviar
        // Recargar la lista de eventos
        setEvents([...events, response.data]);
      })
      .catch((error) => {
        toast.error("Error al registrar evento");
        console.error("Error al registrar evento:", error);
      });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "10vh 0" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: "1vw",
          marginTop: "3vh",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box>
        <Button
          color="success"
          sx={(theme) => ({
            backgroundColor: "white",
            border: "solid",
            flex: "1 1 200px",
            marginBottom: "1vh",
            height: "8vh", // Altura por defecto
            width: "20vw", // Ancho por defecto
            [theme.breakpoints.down("md")]: {
              height: "5vh", // Ajuste de altura en pantallas más pequeñas
              width: "70vw", // Ajuste de ancho en pantallas más pequeñas
            },
          })}
          onClick={handleOpen}
        >
          Crear evento
        </Button>
        </Box>
        <Link to={"/admin-players"}>
          <Button
            color="success"
            sx={(theme) => ({
              backgroundColor: "white",
              border: "solid",
              flex: "1 1 200px",
              marginBottom: "1vh",
              height: "8vh", // Altura por defecto
              width: "20vw", // Ancho por defecto
              [theme.breakpoints.down("md")]: {
                height: "5vh", // Ajuste de altura en pantallas más pequeñas
                width: "70vw", // Ajuste de ancho en pantallas más pequeñas
              },
            })}
          >
            Sección jugadores
          </Button>
        </Link>

        <Link to={"/statistics"}>
          <Button
            color="success"
            sx={(theme) => ({
              backgroundColor: "white",
              border: "solid",
              flex: "1 1 200px",
              marginBottom: "1vh",
              height: "8vh", // Altura por defecto
              width: "20vw", // Ancho por defecto
              [theme.breakpoints.down("md")]: {
                height: "5vh", // Ajuste de altura en pantallas más pequeñas
                width: "70vw", // Ajuste de ancho en pantallas más pequeñas
              },
            })}
          >
            Estadísticas
          </Button>
        </Link>
      </Box>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ color: "green" }}>Crear nuevo evento</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre del evento"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Crear
          </Button>
        </DialogActions>
      </Dialog>

      {/* Listado de eventos */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr", // 1 columna en pantallas pequeñas
            sm: "1fr 1fr", // 2 columnas en pantallas medianas
            md: "1fr 1fr 1fr", // 3 columnas en pantallas más grandes
          },
          gap: "2vw",
          width: "90%",
          marginTop: "5vh",
        }}
      >
        {events.map((event) => (
          <CardContent
            key={event.id}
            sx={{
              border: "2px solid green",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2vh",
              padding: "2vh",
            }}
          >
            <Typography variant="h5" component="div">
              {event.titulo || "Sin título"}
            </Typography>
            <Typography variant="body2">
              Fecha: {new Date(event.createAd).toLocaleDateString("es-ES")}
            </Typography>

            <Link to={`/event/${event.id}`}>
              <Button
                color="inherit"
                sx={{ backgroundColor: "green", color: "white" }}
                size="small"
              >
                Ver más
              </Button>
            </Link>
          </CardContent>
        ))}
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default AdminComision;
