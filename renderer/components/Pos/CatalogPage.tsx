import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import { AppContext } from "./../../context/AuthProvider";
import api from "./../../lib/api";
import {
  AppContextType,
  IProduct,
  ResponsePaginated,
} from "./../../context/Types";
import { AxiosResponse } from "axios";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Drawer,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

function CatalogPage({ AddComponent, addLabel, title, children }) {
  const { setNotification } = useContext(AppContext) as AppContextType;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [openAddSection, setOpenAddSection] = useState(false);

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
    price: 0,
    barcode: "",
  });

  const toggleDrawer = () => {
    setOpenAddSection(!openAddSection);
  };

  return (
    <Layout>
      <Grid container>
        <Grid item sm={12} style={{ textAlign: "right" }}>
          <Button onClick={toggleDrawer} type="submit" variant="contained">
            {addLabel || "+ Agregar"}
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        </Grid>
      </Grid>

      {children}

      <Drawer
        anchor="right"
        open={openAddSection}
        onClose={toggleDrawer}
        style={{
          paddingTop: "100px",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: "100px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AddComponent onCancel={toggleDrawer} onSuccess={toggleDrawer} />
          </Box>
        </Container>
      </Drawer>
    </Layout>
  );
}

export default CatalogPage;
