import React from "react";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Appbar from "@material-ui/core/AppBar";
import ArrowForward from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles((theme) => ({
  iconColor: {
    color: "#fff",
  },
}));

const AppBar = (props) => {
  const classes = useStyles();

  const handleBack = () => {
    props.history.goBack();
  };

  return (
    <Appbar position="sticky" dir="rtl">
      <Grid container>
        <Grid item xs={2}>
          <IconButton aria-label="previous" onClick={handleBack}>
            <ArrowForward className={classes.iconColor} />
          </IconButton>
        </Grid>
        <Grid item xs={10} style={{ marginTop: "10px" }}>
          {props.displayText}
        </Grid>
      </Grid>
    </Appbar>
  );
};

export default withRouter(AppBar);
