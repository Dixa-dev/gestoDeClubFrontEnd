import { Box } from '@mui/material'
import  { useState } from 'react'

const Search = () => {
  const [selectedPlayer, setSelectedPlayer] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para la categoría seleccionada
  const [jugadores, setJugadores] = useState([]);




const filteredCategory = selectedCategory 
? jugadores.filter((jugador) => jugador.categoria === selectedCategory) 
: jugadores;


const filteredPlayer = selectedPlayer? jugadores.filter((jugador)=> jugador.nombre && jugador.apellido === selecterd)




const quitarFiltros = () => {
  setSelectedCategory(""); 
};





  return (
   <Box>
dsada
    
   </Box>
  )
}

export default Search