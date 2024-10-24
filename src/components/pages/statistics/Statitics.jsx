import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Statitics = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    axios.get("https://gestor-de-club.vercel.app/api/estadisticas").then((res) => {
      setBalances(res.data);
    });
  }, []);

  console.log(balances);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2vh",
      }}
    >
      <Box
        sx={{
          margin: "5vh 0",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: "2vh", sm: "2vw" },
          alignItems: "center",
        }}
      >
        <TextField
          label="Mes"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <TextField
          label="Año"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          type="number" // Para asegurar que solo se ingresen números
        />
        <Button type="button">Aplicar filtro</Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "3vw",
        }}
      >
        {balances.map((balance) => {
          return (
            <Box
              key={balance.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2vh",
                border: "solid 2px #00800080",
                marginBottom: "5vh",
                height: "20vh",
                width: { xs: "80vw", sm: "15vw" },
                justifyContent: "space-around",
              }}
            >
              <Typography color="success">Mes: {balance.mes}</Typography>
              <Typography color="success">Año: {balance.anio}</Typography>
              <Link to={`/statistics/${balance.mes}/${balance.anio}`}>
                <Button>Ver balance</Button>
              </Link>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Statitics;
