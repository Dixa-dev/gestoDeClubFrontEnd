import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, TableCell, Typography } from "@mui/material";

// Estilos personalizados para las celdas
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
}));

const DetailEvent = () => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [data, setData] = useState({});

  const { id } = useParams();
  const url = `https://gestor-de-club.vercel.app/api/eventos/${id}`;
  console.log(id);

  useEffect(() => {
    axios.get(url).then((res) => {
      const detailData = res.data;
      setData(detailData);
      setIncome(detailData.recaudacion);
      setExpense(detailData.gastos);
    });
  }, [id, url]);

  // Calcular total recaudado y total gastado
  const totalIncome =
    income.reduce((acc, item) => acc + item.recaudacionEntradas + item.recaudacionEstacionamiento, 0);
  const totalExpense = expense.reduce((acc, item) => acc + item.monto, 0);

  return (
    <>
      <Box>
        <Typography variant="h4">{data.titulo}</Typography>
        <Typography variant="subtitle1">
          Fecha: {new Date(data.createAd).toLocaleDateString("es-ES")}
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Descripción</StyledTableCell>
                <StyledTableCell align="right">Monto</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Recaudaciones */}
              {income.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell align="right">{row.monto}</TableCell>
                </TableRow>
              ))}
              

              {/* Gastos */}
              {expense.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell align="right">{row.monto}</TableCell>
                </TableRow>
              ))}

              {/* Total */}
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
