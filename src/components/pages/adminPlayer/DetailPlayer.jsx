import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FormFee from './FormFee'; // Asegúrate de importar el componente

const formatColumnTitle = (title) => {
  return title
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());
};

const DetailPlayer = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [cuotas, setCuotas] = useState([]);
  const [showCuotas, setShowCuotas] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); 
  const [role, setRole] = useState("")


  const url = `https://gestor-de-club.vercel.app/api/jugadores/${id}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      const detailData = res.data;
      setData(detailData);
      setCuotas(detailData.cuotas);
    });
  }, [id, url]);

  useEffect(()=>{
    
      const userFromLocalStorage = JSON.parse(localStorage.getItem("user"))
      console.log(userFromLocalStorage.role);
      
  
      
        setRole(userFromLocalStorage.role)
  
      
    


  },[role])
 

  

  
  return (
    <Box>
      <Link
        to={"https://gesto-de-club-front-end.vercel.app/admin-players"}
        
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "2vh",
            marginLeft: "5vw",
          }}
        >
          <ArrowBackIosIcon />
          <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
            Volver
          </Typography>
        </Box>
      </Link>

      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Card
          sx={{
            display: "flex",
            marginBottom: "10vh",
            marginTop: "10vh",
            border: "solid black 2px",
            width: "50%",
            justifyContent: "space-around",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "5vh",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={2}>
              {data.nombre && data.apellido && (
                <Avatar
                  sx={{
                    bgcolor: "green",
                    width: "10vw",
                    height: "20vh",
                    fontSize: "2.5rem",
                  }}
                >
                  {`${data.nombre[0]}${data.apellido ? data.apellido[0] : ""}`}
                </Avatar>
              )}
            </Stack>

            <CardActions>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "2vh" }}>

                {(role === "COBRADOR" || role === "SUPER") && (<Button
                  variant="outlined"
                  size="small"
                  color="success"
                  onClick={() => setModalOpen(true)} // Abrir modal
                >
                  Registrar cuota
                </Button>) }
                
                
                <Button
                  variant="outlined"
                  size="small"
                  color="success"
                  onClick={() => setShowCuotas(!showCuotas)}
                >
                  Historial cuota
                </Button>
              </Box>
            </CardActions>
          </CardContent>

          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {Object.entries(data)
                    .filter(
                      ([key]) => key !== "id" && key !== "createAd" && key !== "updatedAt" && key !== "cuotas"
                    )
                    .map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell sx={{ paddingRight: "5vw" }}>
                          <Typography variant="body1" component="div" fontWeight="bold">
                            {formatColumnTitle(key)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" component="div">
                            {value !== null && value !== undefined ? String(value) : "N/A"}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Tabla de cuotas */}
      {showCuotas && (
        <Box sx={{ marginTop: "2vh", padding: "0 5vw" }}>
          <Typography variant="h6">Historial de Cuotas</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {cuotas.length > 0 ? (
                  cuotas.map((cuota, index) => (
                    <TableRow key={index}>
                      <TableCell>{cuota.anio}</TableCell>
                      <TableCell>{cuota.comprobantePago}</TableCell>
                      <TableCell>{cuota.fechaPago}</TableCell>
                      <TableCell>{cuota.mes}</TableCell>
                      <TableCell>{cuota.monto}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>No hay cuotas registradas.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Modal para registrar cuota */}
      <FormFee
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        jugadorId={data.id} 
      />
    </Box>
  );
};

export default DetailPlayer;
