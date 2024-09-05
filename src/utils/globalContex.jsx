// import axios from "axios";
// import { createContext, useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom";

// export const ContextGlobal = createContext();

// export const ContextProvider = ({ children }) => {

//     const [isLoggedIn, setIsLoggedIn] = useState( localStorage.getItem("isLoggedIn") === "true");

//     const [user, setUser] = useState(
//         localStorage.getItem("user")
//           ? JSON.parse(localStorage.getItem("user"))
//           : null
//       );
//       const [role, setRole] = useState([])

//       const navigate = useNavigate();

//       const login = async (email, password) => {
//         try {
//           const response = await axios.post(
//             "http://18.191.210.53:8082/api/login",
//             {
//               email: email,
//               password: password,
//             },
//             {
//               withCredentials: true,
//             }
//           );
    
//           const responseData = response.data;
          
    
//           if (responseData.message === "Email not exists") {
//             alert("El correo electrónico no existe");
//             localStorage.removeItem("isLoggedIn");
//             localStorage.removeItem("user");
//           } else if (responseData.message === "Login Success") {
//             setIsLoggedIn(true);
//             navigate("/home");
//             localStorage.setItem("isLoggedIn", "true");
//             localStorage.setItem("user", JSON.stringify(responseData.user));
//             setUser(responseData.user);
//           } else {
//             alert("El correo electrónico y la contraseña no coinciden");
//           }
//         } catch (error) {
//           console.error(error);
//           console.log("Respuesta de error:", error.response);
//           alert("Se produjo un error al iniciar sesión");
//         }
//       };
    
//       const handleLogout = () => {
//         localStorage.removeItem("isLoggedIn");
//         localStorage.removeItem("user");
//         setIsLoggedIn(false);
//         navigate("/home");
//         setUser(null);
//       };

//       useEffect(()=>{
//         axios.get(urlUsuarios).then((roleRes)=>{
//           setRole(roleRes.data)
//         })
//       },[])

//       const obj = {
       
//         isLoggedIn,
//         login,
//         user,
//         handleLogout,
//         role
//       };

//   return (
//     <ContextGlobal.Provider value={{ obj }}>{children}</ContextGlobal.Provider>  )


// }