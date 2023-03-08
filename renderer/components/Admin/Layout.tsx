import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const mdTheme = createTheme();

function DashboardAdmin({ children }) {
  const [open, setOpen] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [items, setItems] = React.useState([]);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const removeItem = (row, index) => {
    let itemsCopy = [...items];
    itemsCopy.splice(index, 1);

    setItems(itemsCopy);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}></Box>
    </ThemeProvider>
  );
}

export default DashboardAdmin;
