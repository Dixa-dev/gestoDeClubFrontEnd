import  { useState, useEffect } from "react";
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

// Estilos personalizados para las celdas
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
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
  const totalIncome = income.reduce((acc, item) => acc + item.monto , 0);
  const totalExpense = expense.reduce((acc, item) => acc + item.monto, 0);

  console.log(totalIncome);
  console.log(totalExpense);
  

  const handleOpenModal = (type) => {
    setOpenModal({ type, isOpen: true });
  };

  const handleCloseModal = () => {
    setOpenModal({ type: null, isOpen: false });
  };

  return (
    <>
      <Box>
        <Typography variant="h4">{data.titulo}</Typography>
        <Typography variant="subtitle1">
          Fecha: {new Date(data.createAd).toLocaleDateString("es-ES")}
        </Typography>
        <Box>
          <Button onClick={() => handleOpenModal("expense")}>Agregar gasto</Button>
          <Button onClick={() => handleOpenModal("income")}>Agregar ingreso</Button>
        </Box>

        <TransactionModal
          open={openModal.isOpen}
          handleClose={handleCloseModal}
          type={openModal.type}
          eventId={id}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Descripción</StyledTableCell>
                <StyledTableCell align="right">Monto</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {income.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell align="right">{row.monto}</TableCell>
                </TableRow>
              ))}

              {expense.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell align="right">{row.monto}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <StyledTableCell>Total Recaudado</StyledTableCell>
                <StyledTableCell align="right">{totalIncome}</StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>Total Gastos</StyledTableCell>
                <StyledTableCell align="right">{totalExpense}</StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>Total Neto</StyledTableCell>
                <StyledTableCell align="right">{totalIncome - totalExpense}</StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default DetailEvent;
