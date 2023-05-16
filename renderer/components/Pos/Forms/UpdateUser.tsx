import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { IUpdateUserForm } from "../../../domain/Forms";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import api from "../../../lib/api";
import { AppContextType } from "../../../context/Types";
import { AppContext } from "../../../context/AuthProvider";
import PropTypes from "prop-types";

function UpdateUser({ data, onCancel, onSuccess }) {
  const { setNotification } = useContext(AppContext) as AppContextType;

  const [user, setUser] = useState<IUpdateUserForm>({
    email: "",
    username: "",
    role: "",
  });

  useEffect(() => {
    setUser({
      email: data.email,
      username: data.username,
      role: data.role,
    });
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.update(`/pos/users/${data.uuid}`, user);
      //Router.replace("/Home");
      setNotification("¡Información actualizada!", "success");
      setUser({
        email: "",
        username: "",
        role: "",
      });
      onSuccess();
    } catch (error) {
      setNotification(error.message, "error");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        Detall de usuario
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            margin="normal"
            id="email"
            size="small"
            name="email"
            label="Correo electrónico"
            fullWidth
            autoComplete="email"
            onChange={handleChange}
            value={user?.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            size="small"
            required
            id="username"
            name="username"
            label="Nombre de usuario"
            onChange={handleChange}
            value={user?.username}
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel size="small" id="demo-simple-select-label">
              Rol *
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user?.role}
              label="Rol"
              fullWidth
              size="small"
              name="role"
              onChange={handleChange}
            >
              <MenuItem value={"admin"}>Administrador</MenuItem>
              <MenuItem value={"cashier"}>Cajero</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box
        sx={{
          marginTop: "16px",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">
            Actualizar
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
  );
}

export default UpdateUser;

UpdateUser.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
  data: PropTypes.object,
};
