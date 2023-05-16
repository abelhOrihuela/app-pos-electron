import React, { useState, useContext, useEffect } from "react";
import Paper from "@mui/material/Paper";

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import { AppContextType } from "../context/Types";
import { AppContext } from "../context/AuthProvider";
import api from "../lib/api";
import TableComponent from "./Pos/TableComponent";
import { AxiosResponse } from "axios";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import UpdateProduct from "./Pos/Forms/UpdateProduct";
import {
  IProductResponse,
  IResponseProductsPaginated,
} from "../domain/Responses";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  formatValue?: (value: string | number) => string;
}

const columns: Column[] = [
  { id: "name", label: "Nombre", minWidth: 170 },
  { id: "description", label: "Descripción", minWidth: 170 },
  { id: "barcode", label: "Código de barras", minWidth: 50 },
  { id: "current_existence", label: "Existencia", minWidth: 50 },
  {
    id: "price",
    label: "Precio",
    minWidth: 50,
    formatValue: (value: number) => {
      return `$${value.toFixed(2)}`;
    },
  },
  {
    id: "created_at",
    label: "Fecha creación",
    minWidth: 100,
    formatValue: (value: string) => {
      return format(parseISO(value), "dd/MM/yyyy");
    },
  },
  {
    id: "updated_at",
    label: "Fecha actualización",
    minWidth: 100,
    formatValue: (value: string) => {
      if (value != "") {
        return format(parseISO(value), "dd/MM/yyyy");
      }
      return "No hay información";
    },
  },
];

function TableProducts({ reload }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [items, setItems] = useState([]);
  const { setNotification } = useContext(AppContext) as AppContextType;

  const [search, setSearch] = useState("");
  const [item, setItem] = useState(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
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
      const { data }: AxiosResponse<IResponseProductsPaginated> = await api.get(
        `/pos/products?page=${page}&size=${rowsPerPage}${filters}`,
        null
      );

      setItems(data.items);
      setPage(data.page);
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

  const handleSelectItem = (item: IProductResponse) => {
    setItem(item);
  };

  const onCancelDetail = () => {
    setItem(null);
  };

  const onSuccessDetail = () => {
    setItem(null);
    getProducts();
  };

  return (
    <Paper
      variant="outlined"
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
    >
      {item ? (
        <UpdateProduct
          data={item}
          onCancel={onCancelDetail}
          onSuccess={onSuccessDetail}
        />
      ) : (
        <React.Fragment>
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
            handleSelectItem={handleSelectItem}
          />
        </React.Fragment>
      )}
    </Paper>
  );
}

export default TableProducts;

TableProducts.propTypes = {
  reload: PropTypes.bool,
};
