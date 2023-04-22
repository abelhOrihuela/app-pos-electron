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

function CatalogPage({ AddComponent, addLabel, title, children }) {
  const [openAddSection, setOpenAddSection] = useState(false);

  const toggleDrawer = () => {
    setOpenAddSection(!openAddSection);
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

      <Drawer
        anchor="right"
        open={openAddSection}
        onClose={toggleDrawer}
        style={{
          paddingTop: "100px",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: "100px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AddComponent onCancel={toggleDrawer} onSuccess={toggleDrawer} />
          </Box>
        </Container>
      </Drawer>
    </Layout>
  );
}

export default CatalogPage;

CatalogPage.propTypes = {
  AddComponent: PropTypes.element,
  children: PropTypes.element,
  addLabel: PropTypes.string,
  title: PropTypes.string,
  onSuccess: PropTypes.func,
};
