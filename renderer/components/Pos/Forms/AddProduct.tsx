import React, { useContext, useEffect, useState } from "react";
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
import { AxiosResponse } from "axios";
import { AppContextType } from "../../../context/Types";
import api from "../../../lib/api";
import PropTypes from "prop-types";
import { IResponsePaginated } from "../../../domain/Responses";
import { useFormik } from "formik";
import * as yup from "yup";

function AddProduct({ onCancel, onSuccess }) {
  const { setNotification } = useContext(AppContext) as AppContextType;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const { data }: AxiosResponse<IResponsePaginated> = await api.get(
        `/pos/categories?page=0&size=100`,
        null
      );
      setCategories(data.items);
    } catch (error) {
      setNotification(error.message, "error");
    }
  };

  const validationSchema = yup.object({
    barcode: yup.string().required("Código de barras es requerido"),
    name: yup.string().required("Nombre es requerido"),
    description: yup.string().required("Descripción es requerida"),
    unit: yup.string().required("Unidad is required"),
    category: yup.number().required("Categoria is required"),
    price: yup.number().required("Precio is required"),
    current_existence: yup.number().required("Existencia is required"),
  });

  const formik = useFormik({
    initialValues: {
      barcode: "",
      name: "",
      description: "",
      unit: "",
      category: null,
      price: null,
      current_existence: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await api.post("/pos/products", values);
        setNotification("¡Producto creado!", "success");
        onSuccess();
      } catch (error) {
        setNotification(error.message, "error");
      }
    },
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Agregar producto
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
            id="barcode"
            size="small"
            name="barcode"
            label="Código de barras"
            fullWidth
            autoComplete="barcode"
            value={formik.values.barcode}
            onChange={formik.handleChange}
            error={formik.touched.barcode && Boolean(formik.errors.barcode)}
          />
        </FormControl>

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
            fullWidth
            autoComplete="description"
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
              error={formik.touched.unit && Boolean(formik.errors.unit)}
              size="small"
              id="demo-simple-select-label"
            >
              Unidad *
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Unidad"
              fullWidth
              size="small"
              name="unit"
              value={formik.values.unit}
              onChange={formik.handleChange}
              error={formik.touched.unit && Boolean(formik.errors.unit)}
            >
              <MenuItem value={"PZA"}>Pieza</MenuItem>
              <MenuItem value={"KG"}>Kilogramo</MenuItem>
              <MenuItem value={"CJA"}>Caja</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            marginTop: "16px",
            marginBottom: "8px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel
              error={formik.touched.category && Boolean(formik.errors.category)}
              id="demo-simple-select-label"
              size="small"
            >
              Categoria *
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              label="Categoria"
              fullWidth
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <FormControl fullWidth>
          <TextField
            size="small"
            required
            margin="normal"
            id="price"
            name="price"
            label="Precio"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            type="number"
            fullWidth
            autoComplete="price"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            required
            margin="normal"
            id="current_existence"
            name="current_existence"
            label="Existencia"
            size="small"
            value={formik.values.current_existence}
            onChange={formik.handleChange}
            error={
              formik.touched.current_existence &&
              Boolean(formik.errors.current_existence)
            }
            type="number"
            fullWidth
            autoComplete="current_existence"
          />
        </FormControl>

        {Object.keys(formik.errors).length > 0 && (
          <FormHelperText error>* Campos requeridos</FormHelperText>
        )}

        <Box
          sx={{
            marginTop: "16px",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained">
              Ingresar
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
