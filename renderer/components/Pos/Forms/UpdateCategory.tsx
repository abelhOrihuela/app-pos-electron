import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, FormHelperText, Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { AppContext } from "../../../context/AuthProvider";
import { AppContextType } from "../../../context/Types";
import api from "../../../lib/api";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
function UpdateCategory({ data, onCancel, onSuccess }) {
  const { setNotification } = useContext(AppContext) as AppContextType;

  const validationSchema = yup.object({
    name: yup.string().required("Nombre es requerido"),
    description: yup.string().required("Descripción es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      name: data.name,
      description: data.description,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await api.update(`/pos/categories/${data.uuid}`, values);
        setNotification("¡Categoria actualizada!", "success");
        onSuccess();
      } catch (error) {
        setNotification(error.message, "error");
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ mt: 1 }}
    >
      <Typography variant="h6" gutterBottom>
        Detall de categoria
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
      </Grid>

      <Box
        sx={{
          marginTop: "16px",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">
            Actualizar
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
  );
}

export default UpdateCategory;

UpdateCategory.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
  data: PropTypes.object,
};
