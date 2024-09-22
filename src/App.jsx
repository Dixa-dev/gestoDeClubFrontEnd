import { BrowserRouter, Route, Routes } from "react-router-dom"
import FormRegistration from "./components/pages/inscription/FormRegistration.jsx"
import NavBar from "./components/layout/navBar/NavBar.jsx"
import Home from "./components/pages/home/Home.jsx"
import Footer from "./components/layout/footer/Footer.jsx"
import AdminPlayer from "./components/pages/adminPlayer/AdminPlayer.jsx"
import DetailPlayer from "./components/pages/adminPlayer/DetailPlayer.jsx"

function App() {
  

  return (
    <>
      <BrowserRouter>
      <NavBar/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<FormRegistration />} />
      <Route path="/admin-players" element={< AdminPlayer />}/>
      <Route path="/admin-players/:id" element={<DetailPlayer />}/>
     

      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
