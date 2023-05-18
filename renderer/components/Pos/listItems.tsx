import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import { Archive, Category, Inventory } from "@mui/icons-material";
import PropTypes from "prop-types";

const MainListItems = ({ currentPage }) => (
  <React.Fragment>
    <ListItemButton selected={currentPage == "/Home"} href="/Home">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItemButton>

    <ListItemButton selected={currentPage == "/Products"} href="/Products">
      <ListItemIcon>
        <Inventory />
      </ListItemIcon>
      <ListItemText primary="Productos" />
    </ListItemButton>

    <ListItemButton selected={currentPage == "/Categories"} href="/Categories">
      <ListItemIcon>
        <Category />
      </ListItemIcon>
      <ListItemText primary="Categorias" />
    </ListItemButton>

    {/* <ListItemButton selected={currentPage == "/Orders"} href="/Orders">
      <ListItemIcon>
        <Archive />
      </ListItemIcon>
      <ListItemText primary="Órdenes" />
    </ListItemButton> */}

    <ListItemButton selected={currentPage == "/Users"} href="/Users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItemButton>
  </React.Fragment>
);

export default MainListItems;

MainListItems.propTypes = {
  currentPage: PropTypes.string,
};
