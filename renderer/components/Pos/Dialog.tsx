import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { IProductResponse } from "../../domain/Responses";

export interface ResulItemsSearch {
  open: boolean;
  selectedValue: IProductResponse;
  onClose: (value: IProductResponse) => void;
  items: IProductResponse[];
}

function SimpleDialog(props: ResulItemsSearch) {
  const { onClose, selectedValue, open, items } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: IProductResponse) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Selecciona un producto</DialogTitle>
      <List sx={{ pt: 0 }} style={{ width: 500 }}>
        {items.map((product) => (
          <ListItem disableGutters key={product.id}>
            <ListItemButton
              onClick={() => handleListItemClick(product)}
              key={product.id}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${product.name} | ${product.description}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem>
          <ListItemButton
            alignItems="center"
            autoFocus
            onClick={() => handleClose(null)}
          >
            <Typography align="center">Cerrar</Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default SimpleDialog;
