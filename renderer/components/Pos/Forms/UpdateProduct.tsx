import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import api from "../../../lib/api";
import { AppContextType, IProduct } from "../../../context/Types";
import { AppContext } from "../../../context/AuthProvider";
import { AxiosResponse } from "axios";
import PropTypes from "prop-types";
import { IResponsePaginated } from "../../../domain/Responses";

function UpdateProduct({ data, onCancel, onSuccess }) {
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

  const [product, setProduct] = useState<IProduct>({
    name: "",
    description: "",
    id: 0,
    price: 0,
    barcode: "",
    category: 0,
    unit: "",
    current_existence: null,
  });

  useEffect(() => {
    setProduct({
      name: data.name,
      description: data.description,
      barcode: data.barcode,
      unit: data.unit,
      category: data.category_id,
      current_existence:
        data.current_existence >= 0 ? data.current_existence : null,
      price: data.price,
    });
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    let parsedValue: any;

    if (type == "number") {
      parsedValue = Number(value);
    } else {
      parsedValue = value;
    }

    setProduct({
      ...product,
      [name]: parsedValue,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.update(`/pos/products/${data.uuid}`, product);
      //Router.replace("/Home");
      setNotification("¡Información actualizada!", "success");
      setProduct({
        name: "",
        description: "",
        id: 0,
        price: 0,
        barcode: "",
        category: 0,
        unit: "",
        current_existence: 0,
      });
      onSuccess();
    } catch (error) {
      setNotification(error.message, "error");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        Detall de usuario
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            margin="normal"
            id="name"
            size="small"
            name="name"
            label="Código de barras"
            fullWidth
            autoComplete="name"
            onChange={handleChange}
            value={product?.barcode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            margin="normal"
            id="name"
            size="small"
            name="name"
            label="Nombre"
            fullWidth
            onChange={handleChange}
            value={product?.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            size="small"
            required
            id="description"
            name="description"
            label="Descripción"
            onChange={handleChange}
            value={product?.description}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              marginTop: "16px",
              marginBottom: "8px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel size="small" id="demo-simple-select-label">
                Unidad *
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={product.unit}
                label="Categoria"
                fullWidth
                size="small"
                name="unit"
                onChange={handleChange}
              >
                <MenuItem value={"PZA"}>Pieza</MenuItem>
                <MenuItem value={"KG"}>Kilogramo</MenuItem>
                <MenuItem value={"CJA"}>Caja</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              marginTop: "16px",
              marginBottom: "8px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" size="small">
                Categoria *
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={product.category}
                size="small"
                label="Categoria"
                fullWidth
                name="category"
                onChange={handleChange}
              >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            size="small"
            required
            margin="normal"
            id="price"
            name="price"
            label="Precio"
            onChange={handleChange}
            value={product?.price}
            type="number"
            fullWidth
            autoComplete="price"
          />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          required
          margin="normal"
          id="current_existence"
          name="current_existence"
          label="Existencia"
          size="small"
          onChange={handleChange}
          value={product?.current_existence}
          type="number"
          fullWidth
          autoComplete="current_existence"
        />
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

export default UpdateProduct;

UpdateProduct.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
  data: PropTypes.object,
};
