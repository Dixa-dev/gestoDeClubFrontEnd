import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

// Función para formatear los títulos de las columnas camelCase
const formatColumnTitle = (title) => {
  return title
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Separa las palabras basadas en camelCase
    .replace(/^./, (str) => str.toUpperCase()); // Pone en mayúscula la primera letra
};

const PlayerList = ({
  setSelectedCategory,
  category,
  quitarFiltros,
  columnas,
  jugadoresFiltrados,
  verificarPago,
  obtenerUltimaCuotaPaga,
  selectedCategory,
  setFilteredPlayer, // Recibe la función para manejar el input
  filteredPlayer, // Recibe el valor del input de búsqueda
}) => {
  // Filtrar las columnas que no se deben mostrar
  const columnasFiltradas = columnas.filter(
    (columna) =>
      columna !== "id" && columna !== "createAd" && columna !== "updatedAt"
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography>Sección jugadores</Typography>

      {/* inicio seccion filtros */}
      <Typography>Filtros:</Typography>
      <Box
  sx={{
    display: "flex",
    marginTop: "2vh",
    marginBottom: "2vh",
    alignItems: "center",
    gap: "1vw",
    justifyContent: "start", // Centra los elementos en el contenedor
  }}
>
  <FormControl sx={{ width: {xs:"40vw",md:"15vw"} }}> {/* Asegúrate de que el ancho sea consistente */}
    <InputLabel
      id="category-label"
      sx={{ background: "white", fontSize: "2vh" }}
      shrink
    >
      
    </InputLabel>
    <Select
      name="categoria"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      variant="outlined"
      size="small"
      displayEmpty
      
    >
      <MenuItem value="">
        <em>Categoría</em>
      </MenuItem>
      {category.map((cat) => (
        <MenuItem key={cat.id} value={cat.name}>
          {cat.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  <TextField
    placeholder="Buscar por nombre o apellido"
    value={filteredPlayer}
    onChange={(e) => setFilteredPlayer(e.target.value)}
    variant="outlined"
    size="small"
    sx={{ width: {xs:"30vw",md:"15vw"} }} // Consistente con el ancho del Select
  />

  <Button
    variant="contained"
    onClick={quitarFiltros}
    sx={{ height: { xs:"5.6vh", md:"3.5vh"}, fontSize: "1.5vh", width: {xs:"5vw", md:"10vw"},  }} // Ajusta el tamaño del botón para que coincida
  >
    Quitar filtros
  </Button>
</Box>

      {/* fin seccion filtros */}

      {/* inicio seccion tabla */}
      <TableContainer component={Paper}>
        <Table sx={{ marginBottom: "10vh" }}>
          <TableHead>
            <TableRow sx={{ background: "black" }}>
              {/* Renderiza los títulos de las columnas dinámicamente y formatea camelCase */}
              {columnasFiltradas.map((columna) => (
                <TableCell sx={{ color: "white" }} key={columna}>
                  {formatColumnTitle(columna)}
                </TableCell>
              ))}
              <TableCell sx={{ color: "white" }} key="estadoPago">
                Última cuota
              </TableCell>
              <TableCell sx={{ color: "white" }}>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jugadoresFiltrados.map((jugador) => (
              <TableRow key={jugador.id}>
                {columnasFiltradas.map((columna) => (
                  <TableCell key={columna}>
                    {columna === "cuotas" ? (
                      verificarPago(jugador.cuotas) ? (
                        <Typography sx={{ color: "green" }}>Pago</Typography>
                      ) : (
                        <Typography sx={{ color: "red" }}>Impago</Typography>
                      )
                    ) : (
                      jugador[columna]
                    )}
                  </TableCell>
                ))}
                <TableCell>{obtenerUltimaCuotaPaga(jugador.cuotas)}</TableCell>
                <TableCell>
                  <Link to={`/admin-players/${jugador.id}`}>
                    <Button>Ver detalle</Button>
                  </Link>
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
