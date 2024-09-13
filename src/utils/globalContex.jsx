// import axios from "axios";
// import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const ContextGlobal = createContext();

// export const ContextProvider = ({ children }) => {
//   // Estado para gestionar si el usuario está logueado
//   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

//   // Estado para gestionar la información del usuario
//   const [user, setUser] = useState(
//     localStorage.getItem("user")
//       ? JSON.parse(localStorage.getItem("user"))
//       : null
//   );

//   // Estado para gestionar el rol del usuario
//   const [role, setRole] = useState(localStorage.getItem("role") || []);

//   const navigate = useNavigate();

//   // URL del endpoint para hacer login
//   const url = "https://gestor-de-club.vercel.app/api/login";

//   // Función para hacer login
//   const login = async (email, password) => {
//     try {
//       const response = await axios.post(
//         url,
//         {
//           email: email,
//           password: password,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       const responseData = response.data;

//       if (responseData.message === "Email not exists") {
//         alert("El correo electrónico no existe");
//         localStorage.removeItem("isLoggedIn");
//         localStorage.removeItem("user");
//         localStorage.removeItem("role");
//       } else if (responseData.message === "Login Success") {
//         setIsLoggedIn(true);
//         navigate("/home");

//         // Guardar el usuario y el rol en el estado y en localStorage
//         const loggedUser = responseData.user;
//         setUser(loggedUser);
//         setRole(loggedUser.role); // Extraer rol del usuario

//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("user", JSON.stringify(loggedUser));
//         localStorage.setItem("role", loggedUser.role);  // Guardar rol en localStorage
//       } else {
//         alert("El correo electrónico y la contraseña no coinciden");
//       }
//     } catch (error) {
//       console.error(error);
//       console.log("Respuesta de error:", error.response);
//       alert("Se produjo un error al iniciar sesión");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("user");
//     localStorage.removeItem("role");  
//     setIsLoggedIn(false);
//     setUser(null);
//     setRole([]);  
//     navigate("/home");
//   };

//   const obj = {
//     isLoggedIn,
//     login,
//     user,
//     handleLogout,
//     role  
//   };

//   return (
//     <ContextGlobal.Provider value={{obj}}>
//       {children}
//     </ContextGlobal.Provider>
//   );
// };
