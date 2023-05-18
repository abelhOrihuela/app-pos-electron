import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { AppContext } from "./../../../context/AuthProvider";
import { AppContextType } from "../../../context/Types";
import api from "../../../lib/api";

import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";

function AddProduct({ onCancel, onSuccess }) {
  const { setNotification } = useContext(AppContext) as AppContextType;

  const validationSchema = yup.object({
    email: yup.string().email().required("Correo electrónico requerido"),
    username: yup.string().required("Nombre es requerido"),
    role: yup.string().required("Rol es requerido"),
    password: yup
      .string()
      .test("len", "Longitud minima requerida 8", (val) => val.length >= 8)
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      role: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await api.post("/pos/users", values);
        setNotification("Usuario creado!", "success");
        onSuccess();
      } catch (error) {
        setNotification(error.message, "error");
      }
    },
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Agregar usuario
      </Typography>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <FormControl fullWidth>
          <TextField
            required
            margin="normal"
            id="email"
            size="small"
            name="email"
            label="Correo electrónico"
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            margin="normal"
            size="small"
            required
            id="username"
            name="username"
            label="Nombre de usuario"
            helperText={formik.touched.username && formik.errors.username}
            fullWidth
            autoComplete="given-name"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
          />
        </FormControl>

        <Box
          sx={{
            marginTop: "16px",
            marginBottom: "8px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel
              size="small"
              id="demo-simple-select-label"
              error={formik.touched.role && Boolean(formik.errors.role)}
            >
              Role *
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Rol"
              fullWidth
              size="small"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
            >
              <MenuItem value={"admin"}>Administrador</MenuItem>
              <MenuItem value={"cashier"}>Cajero</MenuItem>
            </Select>
            {formik.touched.role && Boolean(formik.errors.role) && (
              <FormHelperText error>{formik.errors.role}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <FormControl fullWidth>
          <TextField
            size="small"
            required
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            autoComplete="price"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </FormControl>

        <Box
          sx={{
            marginTop: "16px",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained">
              Guardar
            </Button>

            <Button
              type="button"
              onClick={onCancel}
              variant="contained"
              color="error"
            >
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default AddProduct;

AddProduct.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};
