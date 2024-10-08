import axios from "axios";
import { createContext, useState } from "react";

export const ContexGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // const [category, setCategory] = useState([])

  const login = async (nombre, password) => {
    const url = "https://gestor-de-club.vercel.app/api/login";
    try {
      const response = await axios.post(url, { nombre, password });
  
      if (response.data.message === "login success") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(response.data.usuario));
        
        // Actualizamos el estado directamente
        setUser(response.data.usuario);
        setIsLoggedIn(true); // Asegurarse de actualizar el estado
  
        return response.data.usuario;
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      alert("Error al iniciar sesión");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    
    setUser(null);
  };

 


  const obj = {
    user, 
    login,
    isLoggedIn,
    handleLogout
  }

  return (
    <ContexGlobal.Provider value={{ obj }}>
      {children}
    </ContexGlobal.Provider>
  );
};