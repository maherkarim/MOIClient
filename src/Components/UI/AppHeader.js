import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import strings from "../Localizations/Localizations";
import PACI from "../../Images/PACI.png";

import { useStoreState } from "easy-peasy";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppHeader() {
  const classes = useStyles();
  const auth = useStoreState((state) => state.mainStore.auth);
  const handleSignOut = () => {
    localStorage.setItem("moi-auth", null);
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <img height={50} width={50} alt="" src={PACI} />
          <Typography variant="h6" className={classes.title}>
            {strings.apptitle}
          </Typography>
          <div>
            <IconButton
              aria-label="Account of current user"
              aria-controls="menu-appbar"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {auth.Username}
            <IconButton
              aria-label="Account of current user"
              aria-controls="menu-appbar"
              color="inherit"
              onClick={handleSignOut}
            >
              <PowerSettingsNew />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
