

import axios from "axios";
import { useEffect, useState } from "react";
import { categorias } from "../../../utils/categorias";
import PlayerList from "./PlayerList";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Asegurar que dayjs esté en español
dayjs.locale("es"); // Establecer el idioma español

const AdminPlayer = () => {
    const [jugadores, setJugadores] = useState([]);
  const [columnas, setColumnas] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para la categoría seleccionada
  const [selectedPlayer, setSelectedPlayer] = useState([])


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


  const filteredCategory = selectedCategory 
    ? jugadores.filter((jugador) => jugador.categoria === selectedCategory) 
    : jugadores;

  

  const filteredPlayer = selectedPlayer? jugadores.filter((jugador)=>jugador.apellido === selectedPlayer) : jugadores;


  const quitarFiltros = () => {
    setSelectedCategory(""); 
    selectedPlayer([])
  };

  
  const obtenerUltimaCuotaPaga = (cuotas) => {
    if (cuotas.length === 0) return "Sin pagos";
  
    // Verificar si alguna cuota tiene fecha de pago
    const ultimaCuota = cuotas[cuotas.length - 1];  // La última cuota en el array
  
    if (!ultimaCuota.fechaPago) return "Sin pagos";
  
    // Retornar el mes y año de la última cuota pagada
    return `${ultimaCuota.mes} ${ultimaCuota.anio}`;  // Ejemplo: "Septiembre 2024"
  };
  
  

  const verificarPago = (cuotas) => {
    const mesActual = dayjs().format('MMMM'); // Mes actual como string en español (ejemplo: "septiembre")
    const añoActual = dayjs().format('YYYY'); // Año actual como string (ejemplo: "2024")
    
    return cuotas.some((cuota) => {
      const mesCuota = cuota.mes.trim(); // Eliminar posibles espacios en blanco
      const añoCuota = cuota.anio.trim(); // Eliminar posibles espacios en blanco en el año
      
      // Comparar si el mes y el año coinciden con el mes y año actuales
      return mesCuota.toLowerCase() === mesActual.toLowerCase() && añoCuota === añoActual;
    });
  };






    return (
      <PlayerList
        setSelectedCategory={setSelectedCategory}
        category={category}
        quitarFiltros={quitarFiltros}
        columnas={columnas}
        filteredCategory={filteredCategory}
        verificarPago={verificarPago}
        obtenerUltimaCuotaPaga={obtenerUltimaCuotaPaga}
        selectedCategory={selectedCategory}
        filteredPlayer={filteredPlayer}
      />
    );
  };
  
  export default AdminPlayer;
  
  