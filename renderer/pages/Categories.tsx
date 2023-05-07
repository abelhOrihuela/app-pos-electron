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
import TableCategories from "../components/TableCategories";

function Categories() {
  const { setNotification } = useContext(AppContext) as AppContextType;
  const [items, setItems] = useState([]);
  const [reload, setReaload] = useState(false);

  const onAddSuccess = () => {
    setReaload(true);
    setTimeout(() => {
      setReaload(false);
    }, 100);
  };

  return (
    <CatalogPage
      AddComponent={AddCategory}
      addLabel={"+ Agregar categoria"}
      onAddSuccess={onAddSuccess}
    >
      <TableCategories reload={reload} />
    </CatalogPage>
  );
}

export default Categories;
