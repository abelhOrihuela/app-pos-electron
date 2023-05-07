import React, { useState, useContext, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { format, parseISO } from "date-fns";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import { AppContextType, ResponsePaginated } from "../context/Types";
import { AppContext } from "../context/AuthProvider";
import api from "../lib/api";
import TableComponent from "./Pos/TableComponent";
import { AxiosResponse } from "axios";
import PropTypes from "prop-types";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  formatValue?: (value: string) => string;
}

const columns: Column[] = [
  { id: "name", label: "Nombre", minWidth: 170 },
  { id: "description", label: "Descripción", minWidth: 170 },
  {
    id: "created_at",
    label: "Fecha creación",
    minWidth: 170,
    formatValue: (value: string) => {
      return format(parseISO(value), "dd/MM/yyyy");
    },
  },
  {
    id: "updated_at",
    label: "Fecha actualización",
    minWidth: 170,
    formatValue: (value: string) => {
      console.log(value);
      if (value != "") {
        return format(parseISO(value), "dd/MM/yyyy");
      }
      return "No hay información";
    },
  },
];

function TableCategories({ reload }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const { setNotification } = useContext(AppContext) as AppContextType;

  const [search, setSearch] = useState("");

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (reload) {
      getProducts();
    }
  }, [reload]);

  const getProducts = async () => {
    let filters = "";

    if (search != "") {
      filters = `&filters=[["name","like","${search}"],["OR"],["description","like","${search}"]]`;
    }

    try {
      const { data }: AxiosResponse<ResponsePaginated> = await api.get(
        `/pos/categories?page=${page}&size=${rowsPerPage}${filters}`
      );

      setItems(data.items);
      setPage(data.page);
      setTotal(data.total);
    } catch (error) {
      setNotification(error.message, "error");
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
        <TableComponent
          page={page}
          columns={columns}
          items={items}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
}

export default TableCategories;

TableCategories.propTypes = {
  reload: PropTypes.bool,
};
