import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const FormFee = ({ open, handleClose, jugadorId }) => {
  const [anio, setAnio] = useState("");
  const [mes, setMes] = useState("");
  const [monto, setMonto] = useState("");
  const [comprobantePago, setComprobantePago] = useState("");

  const fechaPago = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD

  const handleSubmit = () => {
    const cuotaData = {
      anio,
      mes,
      monto: Number(monto),
      fechaPago,
      comprobantePago,
      jugadorId,
    };

    axios.post("https://gestor-de-club.vercel.app/api/cuotas", cuotaData)
      .then(response => {
        alert("Cuota registrada", response.data);
        handleClose(); // Cerrar modal después de enviar
      })
      .catch(error => {
        console.error("Error al registrar cuota:", error);
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">Registrar Cuota</Typography>
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
  );
};

export default FormFee;
