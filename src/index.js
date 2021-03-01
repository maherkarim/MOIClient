import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./Css/index.css";
import App from "./App";
import { createStore, StoreProvider } from "easy-peasy";
import modal from "./Components/Modals/modal.js";
import { MemoryRouter } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { StylesProvider, ThemeProvider, jssPreset } from "@material-ui/styles";
import { create } from "jss";
import rtl from "jss-rtl";

const store = createStore(modal);

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const theme = createMuiTheme({
  direction: "rtl",
});

ReactDOM.render(
  <React.StrictMode>
    <MemoryRouter basename="/moi/client">
      <StoreProvider store={store}>
        <StylesProvider jss={jss}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </StylesProvider>
      </StoreProvider>
    </MemoryRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
