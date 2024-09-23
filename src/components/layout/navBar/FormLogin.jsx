import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import * as Yup from "yup";

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const url = "https://gesto-de-club.vercel.app/api/login";

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const sendForm = async (data) => {

    try {


      const response = await axios.post(url, data);
     
      if(response.data.message === "login success"){

        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("user", JSON.stringify(response.data.usuario))
        alert("sesion iniciada");
        if(response.data.usuario.role === "COBRADOR"){
           
            
        navigate("/admin-players")
        }
      }
      
    } catch (error) {
      console.error("Error al enviar formulario", error);
      alert("Error al enviar formulario");
    }
  };

  const { handleChange, handleSubmit, errors, values, touched, handleBlur } =
    useFormik({
      initialValues: {
        nombre: "",
        password: "",
      },
      validationSchema: Yup.object({
        nombre: Yup.string().required("Campo obligatorio"),
        password: Yup.string().required("Campo obligatorio"),
      }),
      validateOnChange: false,
      onSubmit: sendForm,
    });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "10vh",
        marginBottom: "10vh",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          marginBottom: { xs: "2vh", md: "5vh" },
          color: "green",
          fontSize: { xs: "1rem", md: "2.5rem" },
        }}
      >
        Inicio de sesion
      </Typography>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "75%",
          alignItems: "center",
          gap:"5vh"
        }}
      >
        <TextField
          fullWidth
          label="Usuario"
          name="nombre"
          value={values.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
          sx={{ width: "30%" }}
        />
        <TextField
          fullWidth
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          sx={{ width: "30%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" color="success">
          Iniciar sesion
        </Button>
      </form>
    </Box>
  );
};

export default FormLogin;
