import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const container = document.getElementById("root");
const root = createRoot(container);
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#317f27",
    },
  },
});

root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={darkTheme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
