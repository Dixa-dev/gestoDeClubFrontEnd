import { BrowserRouter, Route, Routes } from "react-router-dom"
import FormRegistration from "./components/pages/inscription/FormRegistration"
import ListPlayers from "./components/pages/players/listPlayers"
import NavBar from "./components/layout/navBar/NavBar"
import Home from "./components/pages/home/Home"

function App() {

  return (
    <>
      <BrowserRouter>
      <NavBar/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<FormRegistration />} />
      <Route path="/players" element={<ListPlayers />}>
      </Route>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
