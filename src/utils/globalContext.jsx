import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


export const ContexGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Obtener el usuario del localStorage al cargar el contexto por primera vez
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const login = async (nombre, password) => {
    const url = "https://gestor-de-club.vercel.app/api/login";
    try {
      const response = await axios.post(url, { nombre, password });

      if (response.data.message === "login success") {
        const { token } = response.data;

        // Decodificar el token para obtener los datos del usuario
        const decodedToken = jwtDecode(token);
        const { nombre, role } = decodedToken;

        // Guardar token y usuario en localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ nombre, role }));

        // Actualizar el estado global del contexto
        setUser({ nombre, role });
        setIsLoggedIn(true);
        return { nombre, role };
      } else {
        
        console.log("Error al iniciar sesión: " + response.data.message);
        
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Configurar un interceptor para agregar el token en cada solicitud
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Limpiar el interceptor al desmontar
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

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
