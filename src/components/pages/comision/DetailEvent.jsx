import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, TableCell, Typography } from "@mui/material";
import TransactionModal from "./TransactionModal"; // Importar el modal genérico

// Estilos personalizados para las celdas de encabezado
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  textAlign: "center",
  backgroundColor: "#00800080", // Fondo gris oscuro
  color: "#FFFFFF", // Letra blanca
  border: "1px solid #00800080", // Borde para separar columnas
}));

// Estilos para celdas normales
const RegularTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  border: "1px solid #00800080", // Borde para separar columnas
}));

// Estilos para las celdas de totales
const TotalTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  fontWeight: "bold",
  border: "1px solid #00800080", // Borde para separar columnas
}));

const DetailEvent = () => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [data, setData] = useState({});
  const [openModal, setOpenModal] = useState({ type: null, isOpen: false });

  const { id } = useParams();
  const url = `https://gestor-de-club.vercel.app/api/eventos/${id}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      const detailData = res.data;
      setData(detailData);
      setIncome(detailData.recaudacion);
      setExpense(detailData.gastos);
    });
  }, [id, url]);

  // Calcular total recaudado y total gastado
  const totalIncome = income.reduce((acc, item) => acc + item.monto, 0);
  const totalExpense = expense.reduce((acc, item) => acc + item.monto, 0);

  const handleOpenModal = (type) => {
    setOpenModal({ type, isOpen: true });
  };

  const handleCloseModal = () => {
    setOpenModal({ type: null, isOpen: false });
  };

  // Actualizar el estado con la nueva transacción
  const handleTransactionSuccess = (transaction) => {
    if (transaction.reciboInicial !== undefined) {
      setIncome((prevIncome) => [...prevIncome, transaction]);
    } else {
      setExpense((prevExpense) => [...prevExpense, transaction]);
    }
  };

  return (
    <>
      <Box>
        <Typography sx={{ marginTop: "5vh", marginLeft: "2vh" }} variant="h4">{data.titulo}</Typography>
        <Typography variant="subtitle1" sx={{ marginTop: "0.5vh", marginLeft: "2vh" }}>
          Fecha: {new Date(data.createAd).toLocaleDateString("es-ES")}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "10vw", marginTop: "5vh" }}>
          <Button variant="outlined" color="success" onClick={() => handleOpenModal("expense")}>+ Agregar gasto</Button>
          <Button variant="outlined" color="success" onClick={() => handleOpenModal("income")}> + Agregar ingreso</Button>
        </Box>

        <TransactionModal
          open={openModal.isOpen}
          handleClose={handleCloseModal}
          type={openModal.type}
          eventId={id}
          onTransactionSuccess={handleTransactionSuccess}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TableContainer component={Paper} sx={{ marginBottom: "10vh", marginTop: "5vh", width: "65%" }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Descripción</StyledTableCell>
                  <StyledTableCell>Recibo Inicial</StyledTableCell>
                  <StyledTableCell>Recibo Final</StyledTableCell>
                  <StyledTableCell>Monto</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {income.map((row) => (
                  <TableRow key={row.id}>
                    <RegularTableCell>{row.nombre}</RegularTableCell>
                    <RegularTableCell>{row.reciboInicial ?? "-"}</RegularTableCell>
                    <RegularTableCell>{row.reciboFinal ?? "-"}</RegularTableCell>
                    <RegularTableCell>{row.monto}</RegularTableCell>
                  </TableRow>
                ))}

                {expense.map((row) => (
                  <TableRow key={row.id}>
                    <RegularTableCell>{row.nombre}</RegularTableCell>
                    <RegularTableCell>-</RegularTableCell>
                    <RegularTableCell>-</RegularTableCell>
                    <RegularTableCell sx={{ color: "red" }}>-{row.monto}</RegularTableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TotalTableCell>Total Recaudado</TotalTableCell>
                  <TotalTableCell></TotalTableCell>
                  <TotalTableCell></TotalTableCell>
                  <TotalTableCell>{totalIncome}</TotalTableCell>
                </TableRow>
                <TableRow>
                  <TotalTableCell>Total Gastos</TotalTableCell>
                  <TotalTableCell></TotalTableCell>
                  <TotalTableCell></TotalTableCell>
                  <TotalTableCell>{totalExpense}</TotalTableCell>
                </TableRow>
                <TableRow>
                  <TotalTableCell>Total Neto</TotalTableCell>
                  <TotalTableCell></TotalTableCell>
                  <TotalTableCell></TotalTableCell>
                  <TotalTableCell>{totalIncome - totalExpense}</TotalTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default DetailEvent;
