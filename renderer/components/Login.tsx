import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppContext } from "./../context/AuthProvider";
import { AppContextType, IUser } from "./../context/Types";
import api from "./../lib/api";
import { AxiosResponse } from "axios";
import { CurrentUserResponse, ResponseLogin } from "../domain/Responses";

const theme = createTheme();

export default function SignIn() {
  const { setAccessToken, setUserData, setNotification } = useContext(
    AppContext
  ) as AppContextType;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);

    try {
      const {
        data: { access_token },
      }: AxiosResponse<ResponseLogin> = await api.post("/public/login", data);
      setAccessToken(access_token);
      getCurrentUser();
    } catch (error) {
      setNotification(error.message, "error");
    }
  };

  const getCurrentUser = async () => {
    try {
      const { data }: AxiosResponse<CurrentUserResponse> = await api.get(
        "/pos/me",
        null
      );
      setUserData(data as IUser);
    } catch (error) {
      setNotification(error.message, "error");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
