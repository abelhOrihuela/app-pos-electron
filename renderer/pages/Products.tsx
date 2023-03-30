import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Layout from "../components/Pos/Layout";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Container, CssBaseline, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppContext } from "./../context/AuthProvider";
import TableProducts from "./../components/TableProducts";
import api from "../lib/api";
import { AppContextType, IProduct, ResponsePaginated } from "../context/Types";
import Router from "next/router";
import { AxiosResponse } from "axios";
const theme = createTheme();

function DashboardContent() {
  const { setGeneralError } = useContext(AppContext) as AppContextType;
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
    price: 0,
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
    const data = new FormData(event.currentTarget);

    try {
      await api.post("/pos/products", product);
      Router.replace("/Home");
    } catch (error) {
      setGeneralError(error.message);
    }
  };

  return (
    <Layout>
      <TableProducts items={items} />
    </Layout>
  );
}

export default DashboardContent;
