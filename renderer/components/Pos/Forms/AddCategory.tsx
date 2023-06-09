import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, FormControl, FormHelperText, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { AppContext } from "./../../../context/AuthProvider";
import { AppContextType } from "../../../context/Types";
import api from "../../../lib/api";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
function AddCategory({ onCancel, onSuccess }) {
  const { setNotification } = useContext(AppContext) as AppContextType;

  const validationSchema = yup.object({
    name: yup.string().required("Nombre es requerido"),
    description: yup.string().required("Descripción es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await api.post("/pos/categories", values);
        setNotification("¡Categoria creada!", "success");
        onSuccess();
      } catch (error) {
        setNotification(error.message, "error");
      }
    },
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Agregar categoria
      </Typography>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <FormControl fullWidth>
          <TextField
            margin="normal"
            size="small"
            required
            id="name"
            name="name"
            label="Nombre"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            autoComplete="given-name"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            required
            margin="normal"
            id="description"
            name="description"
            label="Description"
            size="small"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            fullWidth
            autoComplete="description"
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

export default AddCategory;

AddCategory.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};
