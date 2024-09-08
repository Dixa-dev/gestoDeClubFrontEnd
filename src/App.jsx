import { BrowserRouter, Route, Routes } from "react-router-dom"
import FormRegistration from "./components/pages/inscription/FormRegistration.jsx"
import NavBar from "./components/layout/navBar/NavBar.jsx"
import Home from "./components/pages/home/Home.jsx"
import PlayerList from "./components/pages/players/PlayerList.jsx"
import CuotasPorMes from "./components/pages/statistics/Graphic.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
      <NavBar/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<FormRegistration />} />
      <Route path="/players" element={<PlayerList />}/>
      <Route path="/statistics" element={<CuotasPorMes />} />
     

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
