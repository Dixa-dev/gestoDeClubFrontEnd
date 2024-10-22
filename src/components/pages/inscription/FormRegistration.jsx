import { Box, Button, Typography, Select, MenuItem, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios"; 
import { categorias } from "../../../utils/categorias"; 
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput.jsx";
import InputMask from "react-input-mask";



const FormRegistration = () => {
  const [category, setCategory] = useState([]);
  const url = "https://gestor-de-club.vercel.app/api/jugadores"; 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: categorias });
          }, 1000); 
        });

        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const sendForm = async (data) => {
    try {
      await axios.post(url, data);
      console.log(data);
      alert("Formulario enviado con éxito");
      formik.resetForm(); 
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message); 
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
      nombre: Yup.string().required("Campo obligatorio").min(2, "Debe tener al menos 2 caracteres").max(15, "No debe exceder 15 caracteres"),
      apellido: Yup.string().required("Campo obligatorio").min(2, "Debe tener al menos 2 caracteres").max(15, "No debe exceder 15 caracteres"),
      dni: Yup.string().required("Campo obligatorio").min(5, "Debe tener al menos 5 dígitos"),
      celular: Yup.string().required("Campo obligatorio"),
      celularEmergencia: Yup.string().required("Campo obligatorio"),
      fechaNacimiento: Yup.string().required("Campo obligatorio"),
      categoria: Yup.string().required("Campo obligatorio"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      const fechaFormateada = new Date(values.fechaNacimiento).toLocaleDateString("es-ES");
      const formData = { ...values, fechaNacimiento: fechaFormateada };
      sendForm(formData);
    },
  });

  const handleCancel = () => {
    formik.resetForm();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "100%",
        marginTop: { xs: "5vh", md: "10vh" },
        marginBottom: "10vh",
      }}
    >
      <Typography sx={{ marginBottom: { xs: "2vh", md: "5vh" }, color: "green", fontSize: { xs: "1.5rem", md: "3.5rem" } }}>
        Inscripción de jugadores
      </Typography>

      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }} // Alineación centrada
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: { md: "30vw", xs: "80vw" } }}>
          <TextInput label="Nombre" name="nombre" placeholder="Ej: Juan" formik={formik} />
          <TextInput label="Apellido" name="apellido" placeholder="Ej: Perez" formik={formik} />
          <TextInput label="Documento" name="dni" placeholder="Ej: 35610825" formik={formik} />
          <TextInput label="Celular" name="celular" placeholder="Ej: 221 5456633" formik={formik} />
          <TextInput label="Celular Emergencia" name="celularEmergencia" placeholder="Ej: 221 6082234" formik={formik} />
          <InputMask
            mask="99/99/9999"
            value={formik.values.fechaNacimiento}
            onChange={formik.handleChange}
            name="fechaNacimiento"
          >
            {({ value, ...inputProps }) => (
              <TextInput
                {...inputProps}
                value={value}
                label="Fecha de nacimiento"
                name="fechaNacimiento"
                placeholder="DD/MM/YYYY"
                formik={formik}
              />
            )}
          </InputMask>

          <Box sx={{ display: "flex", flexDirection: "column", width: "100%"}}>
            <Typography sx={{ marginLeft: "0.5vw", color: "green" }}>Categoría</Typography>
            <FormControl sx={{ marginBottom: "1vh", width: "100%" }}>
              <Select
                value={formik.values.categoria}
                onChange={formik.handleChange}
                name="categoria"
                error={formik.errors.categoria ? true : false}
                sx={{ border: "solid 1px green", width: "100%" }}
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
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "7vh", gap: "5vw" }}>
          <Button onClick={handleCancel} variant="outlined" color="success" sx={{ width: {xs:"30vw", md:"10vw"}, height: "5vh" }}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="success" sx={{ width: {xs:"30vw", md:"10vw"}, height: "5vh" }}>
            Enviar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormRegistration;