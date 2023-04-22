import React, { useState, useContext, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

import { AppContextType, IProduct, ResponsePaginated } from "../context/Types";
import { AppContext } from "../context/AuthProvider";
import Router from "next/router";
import { AxiosResponse } from "axios";
import api from "../lib/api";

interface Column {
  id: "name" | "description" | "barcode" | "price";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Nombre", minWidth: 170 },
  { id: "description", label: "Descripción", minWidth: 170 },
  { id: "barcode", label: "Código de barras", minWidth: 170 },
  { id: "price", label: "Precio", minWidth: 170 },
];

function ProductsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const { setGeneralError } = useContext(AppContext) as AppContextType;

  const [search, setSearch] = useState("");

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const removeItem = (row, index) => {
    const itemsCopy = [...items];
    itemsCopy.splice(index, 1);

    setItems(itemsCopy);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, [page, rowsPerPage]);

  const getProducts = async () => {
    let filters = "";

    if (search != "") {
      filters = `&filters=[["name","like","${search}"],["OR"],["description","like","${search}"]]`;
    }

    try {
      const { data }: AxiosResponse<ResponsePaginated> = await api.get(
        `/pos/products?page=${page}&size=${rowsPerPage}${filters}`
      );

      setItems(data.items);
      setPage(data.page);
      setTotal(data.total);
    } catch (error) {
      setGeneralError(error.message);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        {" "}
        <form onSubmit={handleSubmit}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Buscar...
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              onChange={onChange}
              value={search}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  ></IconButton>
                </InputAdornment>
              }
              label="Buscar..."
            />
          </FormControl>
        </form>
      </Paper>

      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        {/*  */}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 100, 200]}
          component="div"
          count={200}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
}

export default ProductsTable;

ProductsTable.propTypes = {
  items: PropTypes.array,
};
