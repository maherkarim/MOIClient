import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import PACI from "../../Images/PACI.png";
import { useStoreActions, useStoreState } from "easy-peasy";
import { withRouter } from "react-router-dom";
import strings from "../Localizations/Localizations";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: "#434e6f",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  message: {
    color: "#ff0000",
  },
  root: {
    margin: "10px",
    marginTop: "40px",
    padding: "40px",
    alignItems: "center",
  },
}));

const Login = () => {
  const classes = useStyles();
  strings.setLanguage("ar");

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const loginMessage = useStoreState((state) => state.mainStore.loginMessage);
  const Login = useStoreActions((actions) => actions.mainStore.Login);

  const handleChange = (e) => {
    user[e.currentTarget.id] = e.currentTarget.value;
    setUser(user);
  };

  const handleSignInClick = async (e) => {
    e.preventDefault();
    Login(user);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.root} elevation={1}>
        <div className={classes.paper}>
          <img src={PACI} alt="PACI" height="100" width="100" />
          <h3>MOI - PACI</h3>
          <form className={classes.form} onSubmit={handleSignInClick}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="إسم المستخدم"
              name="username"
              autoFocus
              onChange={handleChange}
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="كلمة المرور"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignInClick}
            >
              تسجيل الدخول
            </Button>
            <Box mt={1}>
              <Typography
                variant="body2"
                color="textPrimary"
                className={classes.message}
                align="center"
              >
                {loginMessage}
              </Typography>
            </Box>
          </form>
        </div>
        <Box mt={1}>
          <Typography variant="subtitle2" color="textSecondary" align="center">
            <span>{strings.copyright}</span>
          </Typography>
        </Box>
      </Paper>
      {/* <Grid container spacing={3} dir={"rtl"} style={{ width: "100%" }}>
        <Grid item xs={3}>
          <img src={logo} alt="PACI" height="100" width="100" />
        </Grid>
        <Grid item xs={3}>
          <img src={Health} alt="PACI" height="100" width="100" />
        </Grid>
        <Grid item xs={3}>
          <img src={Baladia} alt="PACI" height="100" width="100" />
        </Grid>
      </Grid> */}
    </Container>
  );
};

export default withRouter(Login);
