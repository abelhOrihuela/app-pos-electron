import React, { ChangeEvent, useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { AppContext } from "./../../../context/AuthProvider";
import { AppContextType, ICategory } from "../../../context/Types";
import api from "../../../lib/api";

import PropTypes from "prop-types";

function AddCategory({ onCancel, onSuccess }) {
  const { setNotification } = useContext(AppContext) as AppContextType;

  const [category, setCategory] = useState<ICategory>({
    name: "",
    description: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.post("/pos/categories", category);
      setNotification("¡Producto creado!", "success");
      setCategory({
        name: "",
        description: "",
      });
      onSuccess();
    } catch (error) {
      console.log(error);
      setNotification(error, "error");
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Agregar categoria
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          id="name"
          name="name"
          label="Nombre"
          onChange={handleChange}
          value={category?.name}
          fullWidth
          autoComplete="given-name"
        />

        <TextField
          required
          margin="normal"
          id="description"
          name="description"
          label="Description"
          onChange={handleChange}
          value={category?.description}
          fullWidth
          autoComplete="description"
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

export default AddCategory;

AddCategory.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};
