import { Box, Typography } from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StatiticsFee = () => {
  const { mes, anio } = useParams(); // Captura mes y año de la URL
  const [feePaid, setFeePaid] = useState(0);
  const [feeNotPaid, setFeeNotPaid] = useState(0);
  const url = `https://gestor-de-club.vercel.app/api/estadisticas`;

  useEffect(() => {
    // Realiza la solicitud a la API
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        console.log(data);

        // Filtrar los datos para encontrar el mes y año correspondiente
        const filteredData = data.find(item => 
          item.mes.toLowerCase() === mes.toLowerCase() && item.anio === anio
        );

        // Asignar valores de pagos realizados y no realizados
        if (filteredData) {
          setFeePaid(filteredData.pagaron);
          setFeeNotPaid(filteredData.noPagaron);
        }
      })
      .catch((error) => {
        console.error("Error al obtener estadísticas:", error);
      });
  }, [mes, anio, url]);

  return (
    <Box sx={{ width: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <Box sx={{ marginLeft: "5vw", marginBottom: "3vh", marginTop:"2vh" }}>
        <Typography variant="h5">Estadisticas de cuotas</Typography>
        <Typography variant="h6">Mes: {mes}</Typography>
        <Typography variant="h6">Año: {anio}</Typography>
      </Box>

      <Box 
        sx={{ 
          display: 'flex', // Usar flexbox para centrar el contenido
          justifyContent: 'center', // Centrar horizontalmente
          alignItems: 'center', // Centrar verticalmente
          width: "100%", // Ancho al 100%
          height: "calc(100vh - 40vh)", // Altura dinámica, restando márgenes
        }}
      >
        <Box 
          sx={{ 
            width: { xs: "100%", sm: "30%" }, // Ancho responsivo
            height: { xs: "200px", sm: "300px" }, // Altura responsiva
            overflow: "hidden", // Evita desbordamiento
            position: "relative" // Permite posicionar el gráfico correctamente
          }}
        >
          <PieChart
            colors={["#ff00008f", "#00800080"]}
            series={[
              {
                data: [
                  { id: 0, value: feePaid, label: 'Pagaron', color: "#00800080" },
                  { id: 1, value: feeNotPaid, label: 'No Pagaron', color: '#ff00008f' },
                ],
                arcLabel: (item) => `${item.value}`, // Muestra el valor en cada porción
                arcLabelMinAngle: 35, // Mínimo ángulo para que aparezca la etiqueta
                arcLabelRadius: '50%', // Ajuste de posición de las etiquetas
              },
            ]}
            sx={{
              width: "100%", // Ajusta el ancho al 100%
              height: "100%", // Ajusta la altura al 100%
              [`& .${pieArcLabelClasses.root}`]: {
                fontWeight: 'bold',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StatiticsFee;
