import * as React from "react";
import Layout from "./../components/Pos/Layout";
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
import useKeyboardShortcut from "./../../node_modules/use-keyboard-shortcut/index";
function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [items, setItems] = React.useState([]);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const itemsCopy = [...items];

    fetch("http://localhost:3000/search?q=" + search)
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          if (data.length > 1) {
            //
          } else {
            itemsCopy.push(data[0]);
            setItems(itemsCopy);

            setTimeout(() => {
              const lastElemnt = document.querySelector(
                "table > tbody > tr:nth-child(" + itemsCopy.length + ")"
              );
              if (lastElemnt?.scrollIntoView) {
                lastElemnt.scrollIntoView();
              }
            }, 100);
          }

          setSearch("");
        } else {
          alert("No results");
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
              // height: 240,
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
