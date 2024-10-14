import axios from "axios";
import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const ContexGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const login = async (nombre, password) => {
    const url = "https://gestor-de-club.vercel.app/api/login";
    try {
      const response = await axios.post(url, { nombre, password });
      console.log(response);

      if (response.data.message === "login success") {
        
        
        const { token } = response.data;

        // Decodificar el token para obtener los datos del usuario, password y rol
        const decodedToken = jwtDecode(token);
        console.log(decodedToken); // Ver qué hay en el token
        const { nombre: nombre, password: password, role: role } = decodedToken;

        // Guardar token y usuario en localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem(
          "user",
          JSON.stringify({ nombre, password, role })
        );
        localStorage.setItem("token", token);

        // Actualizar estados
        setUser({ nombre, password, role });
        setIsLoggedIn(true);

        return { nombre, password, role };
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      
      alert("Error al iniciar sesión");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  const obj = {
    user,
    login,
    isLoggedIn,
    handleLogout,
  };

  return (
    <ContexGlobal.Provider value={{ obj }}>{children}</ContexGlobal.Provider>
  );
};
