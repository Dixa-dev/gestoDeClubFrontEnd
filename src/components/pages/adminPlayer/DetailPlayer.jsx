import React, { useEffect, useState, useContext } from "react";
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
  TableHead,
} from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FormFee from "./FormFee";
import { ContexGlobal } from "../../../utils/globalContext"; // Importar el contexto

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

  const url = `https://gestor-de-club.vercel.app/api/jugadores/${id}`;

  const {
    obj: { user },
  } = useContext(ContexGlobal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const detailData = response.data;
        setData(detailData);
        setCuotas(detailData.cuotas);
      } catch (error) {
        console.error("Error fetching player details:", error);
      }
    };

    fetchData();
  }, [id, url]);

  return (
    <Box>
      <Link
        to={"/admin-players"}
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
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center" }}
          >
            Volver
          </Typography>
        </Box>
      </Link>

      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            marginBottom: "10vh",
            marginTop: "10vh",
            border: "solid black 2px",
            width: { xs: "80%", md: "50%" },
            justifyContent: "space-around",
            padding: { xs: "2vh", md: "0" },
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
                    width: { md: "10vw", xs: "20vw" },
                    height: { md: "20vh", xs: "15vh" },
                    fontSize: { md: "2.5rem", xs: "1.5rem" },
                  }}
                >
                  {`${data.nombre[0]}${data.apellido ? data.apellido[0] : ""}`}
                </Avatar>
              )}
            </Stack>

            <CardActions>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "2vh" }}
              >
                {(user.role === "COBRADOR" || user.role === "SUPER") && (
                  <Button
                    variant="outlined"
                    size="small"
                    color="success"
                    onClick={() => setModalOpen(true)}
                    sx={{ fontSize: { md: "0.9rem", xs: "0.7rem" } }}
                  >
                    Registrar cuota
                  </Button>
                )}

                <Button
                  variant="outlined"
                  size="small"
                  color="success"
                  onClick={() => setShowCuotas(!showCuotas)}
                  sx={{ fontSize: { md: "0.9rem", xs: "0.7rem" } }}
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
                      ([key]) =>
                        key !== "id" &&
                        key !== "createAd" &&
                        key !== "updatedAt" &&
                        key !== "cuotas"
                    )
                    .map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell
                          sx={{ paddingRight: { xs: "1vw", md: "5vw" } }}
                        >
                          <Typography
                            variant="body1"
                            component="div"
                            fontWeight="bold"
                          >
                            {formatColumnTitle(key)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" component="div">
                            {value !== null && value !== undefined
                              ? String(value)
                              : "N/A"}
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
        <Box sx={{ marginTop: "2vh", padding: "0 5vw", marginBottom: "2vh" }}>
          <Typography variant="h6">Historial de Cuotas</Typography>
          <TableContainer component={Paper}>
            <Table>
              {/* Encabezados de la tabla */}
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      background: "#00800080",
                      color: "#FFF",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    Año
                  </TableCell>

                  <TableCell
                    sx={{
                      background: "#00800080",
                      color: "#FFF",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    Mes
                  </TableCell>
                  <TableCell sx={{ background: "#00800080", color: "#FFF" }}>
                    Monto
                  </TableCell>
                  <TableCell
                    sx={{
                      background: "#00800080",
                      color: "#FFF",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    Fecha Pago
                  </TableCell>

                  <TableCell
                    sx={{
                      background: "#00800080",
                      color: "#FFF",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    Comprobante Pago
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cuotas.length > 0 ? (
                  cuotas.map((cuota) => (
                    <TableRow key={cuota.id}>
                      <TableCell sx={{ borderRight: "1px solid #ccc" }}>
                        {cuota.anio}
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #ccc" }}>
                        {cuota.mes}
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #ccc" }}>{cuota.monto}</TableCell>
                      <TableCell sx={{ borderRight: "1px solid #ccc" }}>
                        {cuota.fechaPago}
                      </TableCell>
                      <TableCell >
                        {cuota.comprobantePago}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      No hay cuotas registradas.
                    </TableCell>
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
