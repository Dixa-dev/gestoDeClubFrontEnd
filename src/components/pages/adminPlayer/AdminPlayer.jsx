import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { categorias } from "../../../utils/categorias";
import PlayerList from "./PlayerList";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Asegurar que dayjs esté en español
import { ContexGlobal } from "../../../utils/globalContext";

dayjs.locale("es"); // Establecer el idioma español

// Ajusta el código en AdminPlayer:
const AdminPlayer = () => {
  const { obj: { isLoggedIn, user } } = useContext(ContexGlobal);
  const [jugadores, setJugadores] = useState([]);
  const [columnas, setColumnas] = useState([]);
  const [category, setCategory] = useState(categorias);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredPlayer, setFilteredPlayer] = useState(""); // Mover este estado aquí

  const url = "https://gestor-de-club.vercel.app/api/jugadores";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(url, config);
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

    if (isLoggedIn) {
      fetchJugadores();
    }
  }, [isLoggedIn, token]);

  // Filtrar jugadores por categoría y nombre/apellido
  const filteredCategory = selectedCategory
    ? jugadores.filter((jugador) => jugador.categoria === selectedCategory)
    : jugadores;

  const jugadoresFiltrados = filteredCategory.filter((jugador) =>
    `${jugador.nombre} ${jugador.apellido}`.toLowerCase().includes(filteredPlayer.toLowerCase())
  );

  const quitarFiltros = () => {
    setSelectedCategory("");
    setFilteredPlayer(""); // Ajustar este valor aquí también
  };

  const obtenerUltimaCuotaPaga = (cuotas) => {
    if (cuotas.length === 0) return "Sin pagos";
    const ultimaCuota = cuotas[cuotas.length - 1];
    if (!ultimaCuota.fechaPago) return "Sin pagos";
    return `${ultimaCuota.mes} ${ultimaCuota.anio}`;
  };

  const verificarPago = (cuotas) => {
    const mesActual = dayjs().format('MMMM');
    const añoActual = dayjs().format('YYYY');
    return cuotas.some((cuota) => {
      const mesCuota = cuota.mes.trim();
      const añoCuota = cuota.anio.trim();
      return mesCuota.toLowerCase() === mesActual.toLowerCase() && añoCuota === añoActual;
    });
  };

  return (
    <PlayerList
      setSelectedCategory={setSelectedCategory}
      setFilteredPlayer={setFilteredPlayer} // Pasa esta función para actualizar el estado de búsqueda
      category={category}
      quitarFiltros={quitarFiltros}
      columnas={columnas}
      jugadoresFiltrados={jugadoresFiltrados}
      verificarPago={verificarPago}
      obtenerUltimaCuotaPaga={obtenerUltimaCuotaPaga}
      selectedCategory={selectedCategory}
      filteredPlayer={filteredPlayer} // Pasa el estado para manejar el input de búsqueda
    />
  );
};


export default AdminPlayer;
