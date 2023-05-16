import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { AppContext } from "./../../../context/AuthProvider";
import { AxiosResponse } from "axios";
import { AppContextType, IProduct } from "../../../context/Types";
import api from "../../../lib/api";
import PropTypes from "prop-types";
import { IResponsePaginated } from "../../../domain/Responses";

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

  const [product, setProduct] = useState<IProduct>({
    name: "",
    description: "",
    price: null,
    barcode: "",
    category: null,
    unit: "",
    current_existence: null,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    let parsedValue: number | string;

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
      await api.post("/pos/products", product);
      setNotification("¡Producto creado!", "success");
      setProduct({
        name: "",
        description: "",
        barcode: "",
        price: null,
        category: null,
        unit: "",
        current_existence: null,
      });
      onSuccess();
    } catch (error) {
      setNotification(error.message, "error");
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Agregar producto
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            onChange={handleChange}
            value={product?.barcode}
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
            onChange={handleChange}
            value={product?.name}
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
            onChange={handleChange}
            value={product?.description}
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

        <FormControl fullWidth>
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
        </FormControl>

        <FormControl fullWidth>
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
        </FormControl>

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
