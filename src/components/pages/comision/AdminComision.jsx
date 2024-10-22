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
  CardActions,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        alert("Evento registrado", response.data);
        handleClose(); // Cerrar modal después de enviar
        // Recargar la lista de eventos
        setEvents([...events, response.data]);
      })
      .catch((error) => {
        console.error("Error al registrar evento:", error);
      });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "3vh",
          marginRight: "2vw",
        }}
      >
        <Button
          color="success"
          sx={{ backgroundColor: "white", border: "solid" }}
          onClick={handleOpen}
        >
          Crear evento
        </Button>

        {/* Modal */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle style={{ color: "green" }}>
            Crear nuevo evento
          </DialogTitle>
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
        <Link to={"/admin-players"}>
          <Button
            color="success"
            sx={{ backgroundColor: "white", border: "solid" }}
          >
            Seccion jugadores
          </Button>
        </Link>

        <Link to={"/statistics"}>
          <Button
            color="success"
            sx={{ backgroundColor: "white", border: "solid" }}
          >
            Estadisticas
          </Button>
        </Link>
      </Box>
      {/* Listado de eventos */}
      <Box sx={{ display: "flex", gap: "2vw", margin: "5vw" }}>
        {events.map((event) => (
          <CardContent
            key={event.id}
            sx={{
              border: "2px solid green",
              width: "20vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2vh",
            }}
          >
            <Typography variant="h5" component="div">
              {event.titulo || "Sin título"}
            </Typography>
            <Typography variant="h8">
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
    </Box>
  );
};

export default AdminComision;
