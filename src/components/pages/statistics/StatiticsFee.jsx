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
    // Realiza la solicitud a la API con los parámetros mes y año en el body
    axios
      .get(url, { mes})
      .then((res) => {
        const data = res.data;
        console.log(data); 

        // Procesar los datos devueltos por la API
        if (data && Array.isArray(data)) {
          const paid = data.find(item => item.name === "Pagaron");
          const notPaid = data.find(item => item.name === "No Pagaron");

          // Asignar valores de pagos realizados y no realizados
          setFeePaid(paid ? paid.value : 0);
          setFeeNotPaid(notPaid ? notPaid.value : 0);
        }
      })
      .catch((error) => {
        console.error("Error al obtener estadísticas:", error);
      });
  }, [mes, anio, url]);

  return (
    <Box sx={{ margin: "10vh" }}>
      <Typography>{}</Typography>

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
            arcLabelRadius: '60%', // Ajuste de posición de las etiquetas
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: 'bold',
          },
        }}
        width={400}
        height={200}
      />
    </Box>
  );
};

export default StatiticsFee;
