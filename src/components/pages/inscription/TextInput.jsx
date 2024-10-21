import { Box, TextField, Typography } from "@mui/material";

const TextInput = ({ label, name, type = "text", formik, placeholder, value, onChange, ...rest }) => (
  <Box sx={{ display: "flex", flexDirection: "column" }}>
    <Typography sx={{ marginLeft: "0.5vw", color: "green" }}>{label}</Typography>
    <TextField
      variant="outlined"
      name={name}
      placeholder={placeholder}
      type={type}
      value={value !== undefined ? value : formik.values[name]}
      onChange={onChange !== undefined ? onChange : formik.handleChange}
      error={formik.errors[name] ? true : false}
      helperText={formik.errors[name]}
      sx={{ marginBottom: "1vh", width: { md: "30vw", xs: "80vw" } }}
      color="success"
      {...rest}
    />
  </Box>
);


  export default TextInput