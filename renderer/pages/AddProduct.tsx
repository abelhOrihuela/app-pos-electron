import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Layout from "../components/Pos/Layout";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Breadcrumbs,
  Button,
  Container,
  CssBaseline,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppContext } from "./../context/AuthProvider";
import TableProducts from "./../components/TableProducts";
import api from "../lib/api";
import { AppContextType, IProduct, ResponsePaginated } from "../context/Types";
import Router from "next/router";
import { AxiosResponse } from "axios";
import Link from "../components/Link";
const theme = createTheme();

function DashboardContent() {
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
      setGeneralError(error.message);
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
    } catch (error) {
      setNotification(error.message, "error");
    }
  };

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/Products">
            Products
          </Link>
          <Typography color="text.primary">Agregar producto</Typography>
        </Breadcrumbs>

        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography variant="h6" gutterBottom>
            Agregar producto
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Nombre"
                  onChange={handleChange}
                  value={product?.name}
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="barcode"
                  name="barcode"
                  label="Código de barras"
                  fullWidth
                  autoComplete="barcode"
                  onChange={handleChange}
                  value={product?.barcode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="description"
                  name="description"
                  label="Description"
                  onChange={handleChange}
                  value={product?.description}
                  fullWidth
                  autoComplete="description"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
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
              <Grid item xs={12}>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Crear
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </ThemeProvider>
    </Layout>
  );
}

export default DashboardContent;
