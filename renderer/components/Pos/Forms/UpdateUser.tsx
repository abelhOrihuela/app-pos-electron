// import React, { ChangeEvent, useContext, useEffect, useState } from "react";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import {
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Stack,
// } from "@mui/material";
// import { Box } from "@mui/system";
// import { AppContext } from "./../../../context/AuthProvider";
// import { AxiosResponse } from "axios";
// import {
//   AppContextType,
//   ResponsePaginated,
// } from "../../../context/Types";
// import api from "../../../lib/api";

// import PropTypes from "prop-types";
// import { IUserForm } from "../../../domain/Responses";

// function UpdateUser({ data, onCancel, onSuccess }) {
//   const { setNotification } = useContext(AppContext) as AppContextType;
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     setUser(data)
//     getCategories();
//   }, []);

//   const getCategories = async () => {
//     try {
//       const { data }: AxiosResponse<ResponsePaginated> = await api.get(
//         `/pos/categories?page=0&size=100`
//       );

//       setCategories(data.items);
//     } catch (error) {
//       setNotification(error.message, "error");
//     }
//   };

//   const [user, setUser] = useState<IUserForm>({
//     email: "",
//     username: "",
//     password: "",
//     role: ""
//   });

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setUser({
//       ...user,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       await api.post("/pos/users", user);
//       //Router.replace("/Home");
//       setNotification("Usuario creado!", "success");
//       setUser({
//         email: "",
//         username: "",
//         password: "",
//         role: ""
//       });
//       onSuccess();
//     } catch (error) {
//       setNotification(error.message, "error");
//     }
//   };

//   return (
//     <React.Fragment>
//       <Typography variant="h6" gutterBottom>
//         Agregar usuario
//       </Typography>

//       <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//         <FormControl fullWidth>
//           <TextField
//             required
//             margin="normal"
//             id="email"
//             size="small"
//             name="email"
//             label="Correo electrónico"
//             fullWidth
//             autoComplete="email"
//             onChange={handleChange}
//             value={user?.email}
//           />
//         </FormControl>

//         <FormControl fullWidth>
//           <TextField
//             margin="normal"
//             size="small"
//             required
//             id="username"
//             name="username"
//             label="Nombre de usuario"
//             onChange={handleChange}
//             value={user?.username}
//             fullWidth
//             autoComplete="given-name"
//           />
//         </FormControl>

//         <Box
//           sx={{
//             marginTop: "16px",
//             marginBottom: "8px",
//           }}
//         >
//           <FormControl fullWidth>
//             <InputLabel size="small" id="demo-simple-select-label">
//               Role *
//             </InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={user.role}
//               label="Rol"
//               fullWidth
//               size="small"
//               name="role"
//               onChange={handleChange}
//             >
//               <MenuItem value={"admin"}>Administrador</MenuItem>
//               <MenuItem value={"cashier"}>Cajero</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>

//         <FormControl fullWidth>
//           <TextField
//             size="small"
//             required
//             margin="normal"
//             id="password"
//             name="password"
//             label="Password"
//             onChange={handleChange}
//             value={user?.password}
//             type="text"
//             fullWidth
//             autoComplete="price"
//           />
//         </FormControl>

//         <Box
//           sx={{
//             marginTop: "16px",
//           }}
//         >
//           <Stack direction="row" spacing={2}>
//             <Button type="submit" variant="contained">
//               Ingresar
//             </Button>

//             <Button
//               type="button"
//               onClick={onCancel}
//               variant="contained"
//               color="error"
//             >
//               Cancelar
//             </Button>
//           </Stack>
//         </Box>
//       </Box>
//     </React.Fragment>
//   );
// }

// export default UpdateUser;

// UpdateUser.propTypes = {
//   onCancel: PropTypes.func,
//   onSuccess: PropTypes.func,
// };

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { IUserForm } from "../../../domain/Responses";
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

export default function AddressForm({ data, onCancel, onSuccess }) {
  const { setNotification } = useContext(AppContext) as AppContextType;

  useEffect(() => {
    setUser({
      email: data.email,
      username: data.username,
      role: data.role,
    });
  }, []);

  const [user, setUser] = useState<IUserForm>({
    email: "",
    username: "",
    password: "",
    role: "",
  });

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
        password: "",
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
