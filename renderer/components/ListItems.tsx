import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Button, TableContainer } from "@mui/material";
import Cancel from "@mui/icons-material/Cancel";

export default function ListItems({ items, removeItem }) {
  return (
    <React.Fragment>
      <Title>Items</Title>
      <TableContainer sx={{ maxHeight: 350, minHeight: 350 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Código de barras</TableCell>
              <TableCell>Nombre</TableCell>

              <TableCell align="right">Precio</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.barcode}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{`$${row.price.toFixed(
                  2
                )}`}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => removeItem(row, i)}>
                    <Cancel />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
