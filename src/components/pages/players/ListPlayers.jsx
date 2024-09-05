import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Box, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { categorias } from "../../../utils/categorias"; 
import dayjs from "dayjs"; // Asegúrate de instalar dayjs para manejar fechas

const ListPlayers = () => {
  const [jugadores, setJugadores] = useState([]);
  const [columnas, setColumnas] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para la categoría seleccionada

  const url = "https://gestor-de-club.vercel.app/api/jugadores";

  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const res = await axios.get(url);
        const jugadoresData = res.data;

        if (jugadoresData.length > 0) {
          const columnasDinamicas = Object.keys(jugadoresData[0]);
          setColumnas(columnasDinamicas);
        }

        setJugadores(jugadoresData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchJugadores();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: categorias });
          }, 1000); // Simula un retraso de 1 segundo
        });

        setCategory(response.data); 
      } catch (error) {
        console.error("Error fetching categories", error); 
      }
    };

    fetchCategories();
  }, []);

  const mesActual = dayjs().format('MMMM'); 

  const filteredJugadores = selectedCategory 
    ? jugadores.filter((jugador) => jugador.categoria === selectedCategory) 
    : jugadores;

  const quitarFiltros = () => {
    setSelectedCategory(""); 
  };


  const verificarPago = (cuotas) => {
    return cuotas.some((cuota) => cuota.mes === mesActual);
  };

  
  const obtenerUltimaCuotaPaga = (cuotas) => {
    if (cuotas.length === 0) return "Sin pagos";

    const cuotasPagadas = cuotas.filter(cuota => cuota.fechaPago).sort((a, b) => new Date(b.fechaPago) - new Date(a.fechaPago));

    if (cuotasPagadas.length === 0) return "Sin pagos";

    // Retornar el mes de la última cuota pagada
    return cuotasPagadas[0].mes;
  };

  return (
    <Box sx={{display:"flex", flexDirection:"column"}}>
      <Typography>Sección jugadores</Typography>
      
      <Typography>Filtros:</Typography>
      <Box sx={{display:"flex", marginTop:"2vh", marginBottom:"2vh", alignItems:"center", gap:"1vw"}}>
      <FormControl sx={{ marginBottom: "1vh", width:"10vw"}}>
        <InputLabel id="category-label" sx={{background: "white", fontSize:"2vh" }} >Categoría</InputLabel>
        <Select
          name="categoria"
          value={selectedCategory} // El valor actual de la categoría seleccionada
          onChange={(e) => setSelectedCategory(e.target.value)} // Función para manejar el cambio
          variant="outlined"
          size="small"
        >
          {category.map((cat) => (
            <MenuItem key={cat.id} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={quitarFiltros} sx={{ height:"3vh", fontSize: "1.5vh" }}>Quitar filtros</Button>    
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{background:"black"}}> 
              {/* Renderiza los títulos de las columnas dinámicamente */}
              {columnas.map((columna) => (
                <TableCell sx={{color:"white"}} key={columna}>{columna}</TableCell>
              ))}
              {/* Añadimos una columna extra para el estado del pago y otra para la última cuota */}
              <TableCell sx={{color:"white"}} key="estadoPago">Ultima cuota</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJugadores.map((jugador) => (
              <TableRow key={jugador.id}>
                {columnas.map((columna) => (
                  <TableCell key={columna}>
                    {columna === "cuotas" 
                      ? (
                        verificarPago(jugador.cuotas) 
                          ? <Typography sx={{ color: "green" }}>Pago</Typography>
                          : <Typography sx={{ color: "red" }}>Impago</Typography>
                      )
                      : jugador[columna]
                    }
                  </TableCell>
                ))}
                {/* Columna adicional para mostrar la última cuota pagada */}
                <TableCell>
                  {obtenerUltimaCuotaPaga(jugador.cuotas)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListPlayers;
