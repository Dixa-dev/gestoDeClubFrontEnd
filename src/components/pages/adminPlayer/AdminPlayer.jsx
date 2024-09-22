

import axios from "axios";
import { useEffect, useState } from "react";
import { categorias } from "../../../utils/categorias";
import dayjs from "dayjs";
import PlayerList from "./PlayerList";

const AdminPlayer = () => {
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
      <PlayerList
        setSelectedCategory={setSelectedCategory}
        category={category}
        quitarFiltros={quitarFiltros}
        columnas={columnas}
        filteredJugadores={filteredJugadores}
        verificarPago={verificarPago}
        obtenerUltimaCuotaPaga={obtenerUltimaCuotaPaga}
        selectedCategory={selectedCategory}
      />
    );
  };
  
  export default AdminPlayer;
  
  