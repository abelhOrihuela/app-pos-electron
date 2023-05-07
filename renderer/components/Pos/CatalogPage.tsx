import React, { useState } from "react";
import Layout from "./Layout";

import {
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

function CatalogPage({
  AddComponent,
  addLabel,
  title,
  children,
  onAddSuccess,
}) {
  const [openAddSection, setOpenAddSection] = useState(false);

  const toggleDrawer = () => {
    setOpenAddSection(!openAddSection);
  };

  const onSuccess = () => {
    toggleDrawer();
    onAddSuccess();
  };

  return (
    <Layout>
      <Grid container>
        <Grid item sm={12} style={{ textAlign: "right" }}>
          <Button onClick={toggleDrawer} type="submit" variant="contained">
            {addLabel || "+ Agregar"}
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        </Grid>
      </Grid>

      {children}

      <Drawer anchor="right" open={openAddSection} onClose={toggleDrawer}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: "80px",
              marginBottom: "30px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AddComponent onCancel={toggleDrawer} onSuccess={onSuccess} />
          </Box>
        </Container>
      </Drawer>
    </Layout>
  );
}

export default CatalogPage;

CatalogPage.propTypes = {
  AddComponent: PropTypes.any,
  children: PropTypes.element,
  addLabel: PropTypes.string,
  title: PropTypes.string,
  onSuccess: PropTypes.func,
  onAddSuccess: PropTypes.func,
};
