import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography, useMediaQuery } from "@mui/material";
import axios from "axios";

const TransactionModal = ({ open, handleClose, type, eventId, onTransactionSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    monto: 0,
    reciboInicial: 0,
    reciboFinal: 0,
  });

  const isIncome = type === "income";
  const isMobile = useMediaQuery("(max-width:600px)");

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "80%" : 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "monto" || name === "reciboInicial" || name === "reciboFinal"
        ? parseInt(value, 10) || 0
        : value,
    });
  };

  const handleSubmit = () => {
    const data = {
      nombre: formData.nombre,
      monto: formData.monto,
      eventoId: parseInt(eventId, 10),
      ...(isIncome && {
        reciboInicial: formData.reciboInicial,
        reciboFinal: formData.reciboFinal,
      }),
    };

    const url = isIncome
      ? "https://gestor-de-club.vercel.app/api/recaudacion"
      : "https://gestor-de-club.vercel.app/api/gastos";

    axios
      .post(url, data)
      .then((response) => {
        handleClose();
        onTransactionSuccess(response.data);
      })
      .catch((error) => {
        console.error("Error al agregar transacción:", error);
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6">{isIncome ? "Agregar Ingreso" : "Agregar Gasto"}</Typography>
        <TextField label="Nombre" name="nombre" onChange={handleChange} />
        <TextField
          label="Monto"
          name="monto"
          type="number"
          onChange={handleChange}
          inputProps={{ step: 1 }}
        />
        {isIncome && (
          <>
            <TextField
              label="Recibo Inicial"
              name="reciboInicial"
              type="number"
              onChange={handleChange}
              inputProps={{ step: 1 }}
            />
            <TextField
              label="Recibo Final"
              name="reciboFinal"
              type="number"
              onChange={handleChange}
              inputProps={{ step: 1 }}
            />
          </>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "2vh" }}>
          <Button variant="outlined" color="success" onClick={handleClose}>
            Salir
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Agregar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TransactionModal;
