import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContexGlobal } from "../../../utils/globalContext";

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { obj } = useContext(ContexGlobal);
  const navigate = useNavigate();

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
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
      onSubmit: async (values) => {
        const usuario = await obj.login(values.nombre, values.password);
        if (usuario) {
          if (usuario.role === "COBRADOR") {
            navigate("/admin-players");
          } else if ( usuario.role === "ADMIN" || usuario.role === "SUPER") {
            navigate("/event");
          } else {
            setError("Error en las credenciales o rol no permitido");
          }
        } else {
          setError("Error en las credenciales o rol no permitido");
        }
      },
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
        Inicio de sesión
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2, width: { xs: "80%", md: "30%" } }}>
          {error}
        </Alert>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "75%",
          alignItems: "center",
          gap: "5vh",
        }}
      >
        <TextField
          fullWidth
          label="Usuario"
          name="nombre"
          value={values.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.nombre && Boolean(errors.nombre)}
          helperText={touched.nombre && errors.nombre}
          sx={{ width: { xs: "80%", md: "30%" } }}
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
          sx={{ width: { xs: "80%", md: "30%" } }}
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
          Iniciar sesión
        </Button>
      </form>
    </Box>
  );
};

export default FormLogin;
