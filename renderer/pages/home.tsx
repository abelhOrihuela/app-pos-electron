import React, { useContext, useState } from "react";
import Layout from "../components/Pos/Layout";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@mui/material";
import ListItems from "../components/ListItems";
import Resume from "../components/Resume";
import useKeyboardShortcut from "use-keyboard-shortcut";

import { IProduct } from "../context/Types";
import api from "../lib/api";
import { AppContext } from "../context/AuthProvider";
import SimpleDialog from "../components/Pos/Dialog";
import { AxiosResponse } from "axios";

function DashboardContent() {
  const { setGeneralError } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [itemsSearch, setItemsSearch] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<IProduct>();

  const { flushHeldKeys } = useKeyboardShortcut(
    ["Control", "P"],
    (shortcutKeys) => alert("Shift + H has been pressed."),
    {
      overrideSystem: true,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  );

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const removeItem = (row, index) => {
    const itemsCopy = [...items];
    itemsCopy.splice(index, 1);

    setItems(itemsCopy);
  };

  const generateOrder = () => {
    setItems([]);
    setTimeout(() => {
      alert("order was completed succesfully!");
    }, 100);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const itemsCopy = [...items];

    event.preventDefault();

    try {
      const { data }: AxiosResponse<IProduct[]> = await api.get(
        "/pos/search?q=" + search
      );
      if (data != null) {
        if (data.length > 1) {
          setItemsSearch(data);
          setOpen(true);
        } else {
          itemsCopy.push(data[0]);
          setItems(itemsCopy);

          setTimeout(() => {
            scrollToBottom(items.length);
          }, 100);
        }

        setSearch("");
      } else {
        alert("No results");
      }
    } catch (error) {
      setGeneralError(error.message);
    }
  };

  const handleClose = (value: IProduct) => {
    const itemsCopy = [...items];

    setOpen(false);
    setSelectedValue(value);

    itemsCopy.push(value);
    setItems(itemsCopy);
    setTimeout(() => {
      scrollToBottom(items.length);
    }, 100);
  };

  const scrollToBottom = (size: number) => {
    const lastElemnt = document.querySelector(
      "table > tbody > tr:nth-child(" + size + ")"
    );
    if (lastElemnt?.scrollIntoView) {
      lastElemnt.scrollIntoView();
    }
  };

  return (
    <Layout>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <form onSubmit={handleSubmit}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Buscar...
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="text"
                  onChange={onChange}
                  value={search}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      ></IconButton>
                    </InputAdornment>
                  }
                  label="Buscar..."
                />
              </FormControl>
            </form>
          </Paper>
        </Grid>

        <SimpleDialog
          items={itemsSearch}
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />

        <Grid item xs={12} md={8} lg={9}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <ListItems items={items} removeItem={removeItem} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Resume generateOrder={generateOrder} items={items} />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
