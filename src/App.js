import React, { useEffect } from "react";
import "./Css/App.css";
import { useStoreState, useStoreActions } from "easy-peasy";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import strings from "./Components/Localizations/Localizations";
import Toast from "./Components/UI/Toast";
import Main from "./Components/UI/Main";
import { ModalProvider } from "./Components/Context/modal-context";
import { ToastProvider } from "./Components/Context/toast-context";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "#2f2f2f" },
    hover: { background: "#2f2f2f", color: "#f2f2f2" },
    skeleton: "#2f2f2f",
    fabProgress: "#f2f2f2",
    mobile: "#2f2f2f",
    scrollbar: "#424242",
    autosuggestContainer: "#424242",
    autosuggestHighlighted: "#2f2f2f",
    popup: "#2f2f2f",
    snackbarBG: "#2f2f2f",
    snackbar: "#f2f2f2",
  },
});

const ligthTheme = createMuiTheme({
  palette: {
    type: "light",
    hover: { color: "#000", background: "#f2f2f2" },
    skeleton: "#165184",
    fabProgress: "#2f2f2f",
    mobile: "#f2f2f2",
    scrollbar: "#f5f5f5",
    autosuggestContainer: "#fff",
    autosuggestHighlighted: "#ddd",
    popup: "#f2f2f2",
    snackbarBG: "#2f2f2f",
    snackbar: "#f2f2f2",
  },
});

const App = () => {
  const config = useStoreState((state) => state.mainStore.config);
  const setAuth = useStoreActions((actions) => actions.mainStore.setAuth);
  const fetchConfig = useStoreActions(
    (actions) => actions.mainStore.fetchConfig
  );
  const initializeAppSettings = () => {
    strings.setLanguage("ar");
    let auth = localStorage.getItem("moi-auth");
    if (auth) {
      setAuth(JSON.parse(auth));
    }
  };

  useEffect(() => {
    fetchConfig();
    initializeAppSettings();
    //eslint-disable-next-line
  }, []);

  //if (auth)
  return (
    <div className="App" dir={"rtl"}>
      {config && (
        <ToastProvider>
          <ModalProvider>
            <ThemeProvider theme={ligthTheme}>
              <Main />
              <Toast />
            </ThemeProvider>
          </ModalProvider>
        </ToastProvider>
      )}
    </div>
  );

  // return config && <Login />;
};

export default App;
