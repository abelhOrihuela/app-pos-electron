import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { Button } from "@mui/material";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Resume({ items, generateOrder }) {
  const getAmount = () => {
    const prices = items.map((product) => product.price);
    const total = prices.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

    return (Math.round(total * 100) / 100).toFixed(2);
  };

  return (
    <React.Fragment>
      <Title>Total</Title>
      <Typography component="p" variant="h4">
        {`$${getAmount()}`}
      </Typography>

      <Typography color="text.secondary" component="p" variant="h6">
        {items.length} Items
      </Typography>

      <Button variant="contained" onClick={generateOrder}>
        Pagar
      </Button>
    </React.Fragment>
  );
}
