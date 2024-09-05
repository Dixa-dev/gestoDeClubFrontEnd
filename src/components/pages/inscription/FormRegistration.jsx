import {
  Box,
  Button,
  
  Typography,
  Select,
  MenuItem,
  FormControl,
  
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios"; 
import { categorias } from "../../../utils/categorias"; 
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "./textInput";

const FormRegistration = () => {
  const [category, setCategory] = useState([]);
  const url = "https://gestor-de-club.vercel.app/api/jugadores"; 
  // Simulación de llamada a la API usando axios

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: categorias });
          }, 1000); // Simula un retraso de 1 segundo
        });

        setCategory(response.data); // Guardamos las categorías en el estado
      } catch (error) {
        console.error("Error fetching categories", error); // Manejamos errores en la simulación
      }
    };

    fetchCategories();
  }, []);

  const sendForm = async (data) => {
    try {
      await axios.post(url, data);
      console.log(data);
      
      alert("Formulario enviado con éxito");
    } catch (error) {
      // console.error("Error al enviar formulario", error);
      // alert("Error al enviar formulario");
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message); // Muestra el mensaje del servidor en caso de error 409
      } else {
        console.error("Error al enviar formulario", error);
        alert("Error al enviar formulario");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      dni: "",
      celular: "",
      celularEmergencia: "",
      fechaNacimiento: "",
      categoria: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("Campo obligatorio").min(3, "Debe tener al menos 3 caracteres").max(12, "No debe exceder 12 caracteres"),
      apellido: Yup.string().required("Campo obligatorio").min(3, "Debe tener al menos 3 caracteres").max(12, "No debe exceder 12 caracteres"),
      dni: Yup.string().required("Campo obligatorio").min(5, "Debe tener al menos 5 dígitos"),
      celular: Yup.string().required("Campo obligatorio"),
      fechaNacimiento: Yup.date().required("Campo obligatorio"),
      categoria: Yup.string().required("Campo obligatorio"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      // Convertimos la fecha a string en formato "DD/MM/YYYY"
      const fechaFormateada = new Date(values.fechaNacimiento).toLocaleDateString("es-ES");

      // Creamos una nueva copia de los valores, con la fecha formateada
      const formData = {
        ...values,
        fechaNacimiento: fechaFormateada,
      };

      sendForm(formData);
    },
  });

  const handleCancel = () => {
    formik.resetForm(); // Restablece los valores del formulario
  };

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      maxHeight: "100%",
      marginTop: {xs:"5vh", md:"10vh"},
      marginBottom:"10vh"
    }}
  >
    <Typography sx={{ marginBottom: {xs:"2vh",md:"5vh"}, color: "green", fontSize:{xs:"1.5rem",md:"3.5rem"} }}>
      Inscripción de jugadores
    </Typography>

    <form
      onSubmit={formik.handleSubmit}
      style={{ display: "flex", flexDirection: "column", width: "30vw" }}
    >
      <TextInput label="Nombre" name="nombre" placeholder="Ej: Juan" formik={formik} />
      <TextInput label="Apellido" name="apellido" placeholder="Ej: Perez" formik={formik} />
      <TextInput label="Documento" name="dni" placeholder="Ej: 35610825" formik={formik} />
      <TextInput label="Celular" name="celular" placeholder="Ej: 221 5456633" formik={formik} />
      <TextInput label="Celular Emergencia" name="celularEmergencia" placeholder="Ej: 221 6082234" formik={formik} />
      <TextInput label="Fecha de nacimiento" name="fechaNacimiento" type="date" formik={formik} />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ marginLeft: "0.5vw", color: "green" }}>Categoría</Typography>
        <FormControl sx={{ marginBottom: "1vh" }}>
          <Select
            value={formik.values.categoria}
            onChange={formik.handleChange}
            name="categoria"
            error={formik.errors.categoria ? true : false}
            sx={{ border: "solid 1px green" }}
          >
            {category.map((cat) => (
              <MenuItem key={cat.id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
          {formik.errors.categoria && (
            <Typography color="error" variant="body2">
              {formik.errors.categoria}
            </Typography>
          )}
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "7vh" }}>
        <Button onClick={handleCancel} variant="outlined" color="success">
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="success">
          Enviar formulario
        </Button>
      </Box>
    </form>
  </Box>
  );
};

export default FormRegistration;
