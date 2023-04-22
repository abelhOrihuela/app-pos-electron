import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Pos/Layout";
import { AppContext } from "./../context/AuthProvider";
import TableProducts from "./../components/TableProducts";
import api from "../lib/api";
import { AppContextType, IProduct, ResponsePaginated } from "../context/Types";
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
import { TramRounded } from "@mui/icons-material";
import Login from "./../components/Login";
import CatalogPage from "../components/Pos/CatalogPage";
import AddCategory from "./../components/Pos/Forms/AddCategory";

function Categories() {
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
    price: 0,
    barcode: "",
  });

  return (
    <CatalogPage AddComponent={AddCategory} addLabel={"+ Agregar categoria"}>
      helo
    </CatalogPage>
  );
}

export default Categories;
