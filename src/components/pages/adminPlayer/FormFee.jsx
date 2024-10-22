import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormFee = ({ open, handleClose, jugadorId }) => {
  const [anio, setAnio] = useState("");
  const [mes, setMes] = useState("");
  const [monto, setMonto] = useState("");
  const [comprobantePago, setComprobantePago] = useState("");
  const [error, setError] = useState("");

  const fechaPago = new Date().toISOString().split("T")[0];

  const handleSubmit = () => {
    const normalizedMes = mes.toLowerCase();

    axios.get("https://gestor-de-club.vercel.app/api/cuotas")
      .then(response => {
        const cuotas = response.data;
        if (cuotas) {
          const cuotasJugador = cuotas.filter(fee => fee.jugadorId === jugadorId);
          
          const existingFee = cuotasJugador.find(fee => fee.anio === anio && fee.mes.toLowerCase() === normalizedMes);
          if (existingFee) {
            setError("Ya existe una cuota registrada para este mes y año.");
            return;
          }
        }

        const cuotaData = {
          anio,
          mes: normalizedMes,
          monto: Number(monto),
          fechaPago,
          comprobantePago,
          jugadorId,
        };

        axios.post("https://gestor-de-club.vercel.app/api/cuotas", cuotaData)
          .then(resp => {
            toast.success("Cuota registrada exitosamente");
            handleClose();
          })
          .catch(error => {
            const errorMsg = error.response?.data?.message || "Error al registrar cuota";
            toast.error(errorMsg); 
            console.error("Error al registrar cuota:", error);
          });
      })
      .catch(error => {
        console.error("Error al verificar cuotas existentes:", error);
      });
  };

  return (
    <>
      <ToastContainer />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: { xs: '80vw', md: '400px' }, // Ajuste del ancho para ser más chico en mobile
          }}
        >
          <Typography variant="h6" component="h2">Registrar Cuota</Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            label="Año"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mes"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Comprobante de Pago"
            value={comprobantePago}
            onChange={(e) => setComprobantePago(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fecha de Pago"
            value={fechaPago}
            disabled
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Registrar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default FormFee;

