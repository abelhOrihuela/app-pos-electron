import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Archive, Category, Inventory } from "@mui/icons-material";

const items = [
  {
    label: "Inicio",
    path: "/Home",
  },
  {
    label: "Productos",
    path: "/Products",
  },
  {
    label: "Categorias",
    path: "/Categories",
  },
  {
    label: "Órdenes",
    path: "/Order",
  },
  {
    label: "Usuarios",
    path: "/Users",
  },
];

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

    <ListItemButton selected={currentPage == "/Orders"} href="/Orders">
      <ListItemIcon>
        <Archive />
      </ListItemIcon>
      <ListItemText primary="Órdenes" />
    </ListItemButton>

    <ListItemButton selected={currentPage == "/Users"} href="/Users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItemButton>
  </React.Fragment>
);

export default MainListItems;
