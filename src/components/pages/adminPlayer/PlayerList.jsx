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
  filteredCategory,
  verificarPago,
  obtenerUltimaCuotaPaga,
  selectedCategory,
  filteredPlayer
}) => {


  

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
        }}
      >
        <FormControl sx={{ marginBottom: "1vh", width: "10vw" }}>
          <InputLabel
            id="category-label"
            sx={{ background: "white", fontSize: "2vh" }}
          >
            Categoría
          </InputLabel>
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

        <TextField>
              

        </TextField>
        <Button
          variant="contained"
          onClick={quitarFiltros}
          sx={{ height: "3vh", fontSize: "1.5vh" }}
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
              {columnas.map((columna) => (
                <TableCell sx={{ color: "white" }} key={columna}>
                  {formatColumnTitle(columna)}
                </TableCell>
              ))}
              {/* Añadimos una columna extra para el estado del pago y otra para la última cuota */}
              <TableCell sx={{ color: "white" }} key="estadoPago">
                Última cuota
              </TableCell>
              <TableCell sx={{ color: "white" }}>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategory.map((jugador) => (
              <TableRow key={jugador.id}>
                {columnas.map((columna) => (
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
                {/* Columna adicional para mostrar la última cuota pagada */}
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
