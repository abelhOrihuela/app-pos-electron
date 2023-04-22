import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Breadcrumbs,
  Button,
  Container,
  CssBaseline,
  Paper,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppContext } from "./../../../context/AuthProvider";
import { AxiosResponse } from "axios";
import {
  AppContextType,
  IProduct,
  ResponsePaginated,
} from "../../../context/Types";
import api from "../../../lib/api";

import PropTypes from "prop-types";

const theme = createTheme();

function AddProduct({ onCancel, onSuccess }) {
  const { setNotification } = useContext(AppContext) as AppContextType;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const { data }: AxiosResponse<ResponsePaginated> = await api.get(
        `/pos/products?page=${page}&size=${limit}`
      );

      setItems(data.items);
    } catch (error) {
      setNotification(error.message, "error");
    }
  };

  const [product, setProduct] = useState<IProduct>({
    name: "",
    description: "",
    id: 0,
    price: null,
    barcode: "",
  });

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

    console.log(product);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.post("/pos/products", product);
      //Router.replace("/Home");
      setNotification("¡Producto creado!", "success");
      setProduct({
        id: 0,
        name: "",
        description: "",
        barcode: "",
        price: "",
      });
      onSuccess();
    } catch (error) {
      setNotification(error.message, "error");
    }
  };

  return (
    <React.Fragment
      variant="outlined"
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
    >
      <Typography variant="h6" gutterBottom>
        Agregar producto
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          id="name"
          name="name"
          label="Nombre"
          onChange={handleChange}
          value={product?.name}
          fullWidth
          autoComplete="given-name"
        />

        <TextField
          required
          margin="normal"
          id="barcode"
          name="barcode"
          label="Código de barras"
          fullWidth
          autoComplete="barcode"
          onChange={handleChange}
          value={product?.barcode}
        />

        <TextField
          required
          margin="normal"
          id="description"
          name="description"
          label="Description"
          onChange={handleChange}
          value={product?.description}
          fullWidth
          autoComplete="description"
        />

        <TextField
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
