import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Box, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { categorias } from "../../../utils/categorias"; 
import dayjs from "dayjs";

const PlayerList = () => {

  const [jugadores, setJugadores] = useState([]);
  const [columnas, setColumnas] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para la categoría seleccionada
  const [nombreFiltro, setNombreFiltro] = useState(''); // Estado para el filtro de nombre
  
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

  // Filtrar por nombre y categoría
  const filteredJugadores = jugadores
    .filter((jugador) => {
      if (selectedCategory && jugador.categoria !== selectedCategory) {
        return false;
      }
      if (nombreFiltro && !jugador.nombre.toLowerCase().includes(nombreFiltro.toLowerCase())) {
        return false;
      }
      return true;
    });

  const quitarFiltros = () => {
    setSelectedCategory("");
    setNombreFiltro(""); // Limpiar el filtro de nombre
  };

  const verificarPago = (cuotas) => {
    return cuotas.some((cuota) => cuota.mes === mesActual);
  };

  const obtenerUltimaCuotaPaga = (cuotas) => {
    if (cuotas.length === 0) return "Sin pagos";

    const cuotasPagadas = cuotas.filter(cuota => cuota.fechaPago).sort((a, b) => new Date(b.fechaPago) - new Date(a.fechaPago));

    if (cuotasPagadas.length === 0) return "Sin pagos";

    return cuotasPagadas[0].mes;
  };

  // Función para capitalizar la primera letra y separar camelCase con espacios
  const formatearNombreColumna = (nombre) => {
    return nombre
      .replace(/([a-z])([A-Z])/g, '$1 $2')  // Separa palabras en camelCase
      .replace(/^./, (str) => str.toUpperCase());  // Capitaliza la primera letra
  };

  return (
    <Box sx={{display:"flex", flexDirection:"column", marginTop:"8vh", width:"95%", marginLeft:"2vw"}}>
      
      <Typography color="success">Filtros:</Typography>
      <Box sx={{display:"flex", marginTop:"2vh", marginBottom:"2vh", alignItems:"center", gap:"1vw"}}>
      <FormControl sx={{ marginBottom: "1vh", width:"10vw",}}>
        <InputLabel id="category-label" sx={{background: "white", fontSize:"2vh", color:"green"  }} >Categoría</InputLabel>
        <Select
          name="categoria"
          value={selectedCategory} // El valor actual de la categoría seleccionada
          onChange={(e) => setSelectedCategory(e.target.value)} // Función para manejar el cambio
          variant="outlined"
          size="small"
          color="success"
        >
          {category.map((cat) => (
            <MenuItem key={cat.id} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Filtro por nombre */}
      <FormControl sx={{ marginBottom: "1vh", width:"20vw"}}>
        <InputLabel htmlFor="nombre-busqueda" sx={{background: "white", fontSize:"2vh", color:"green" }}>Buscar por Nombre</InputLabel>
        <input
          type="text"
          id="nombre-busqueda"
          value={nombreFiltro}
          onChange={(e) => setNombreFiltro(e.target.value)} // Actualizar el estado con el valor del input
          placeholder="Nombre del jugador"
          style={{ padding: "0.5rem", fontSize: "1rem", width: "100%" }}
        />
      </FormControl>

      <Button variant="contained" color="success" onClick={quitarFiltros} sx={{ height:"3vh", fontSize: "1.5vh" }}>Quitar filtros</Button>    
      </Box>

      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow sx={{background:"green"}}> 
              {columnas.map((columna) => (
                <TableCell sx={{color:"white"}} key={columna}>{formatearNombreColumna(columna)}</TableCell>
              ))}
              <TableCell sx={{color:"white"}} key="estadoPago">Última Cuota</TableCell>
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

export default PlayerList;
