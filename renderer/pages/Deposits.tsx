import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Total</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>

      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {new Date().toDateString()}
      </Typography>
      <div>
        <Typography color="text.secondary" component="p" variant="h6">
          5 Items
        </Typography>
      </div>
    </React.Fragment>
  );
}
