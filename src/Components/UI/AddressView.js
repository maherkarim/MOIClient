import React from "react";
import { makeStyles } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import PlaceIcon from "@material-ui/icons/Place";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "500",
    fontSize: "16px",
    padding: "2px",
    color: "black",
  },
  details: {
    padding: "2px",
    fontWeight: "400",
    fontSize: "14px",
    color: "black",
  },
  paper: {
    padding: "7px",
    margin: "7px",
  },
}));

const AddressView = ({ Header, Title, Details }) => {
  const classes = useStyles();
  return (
    <div style={{ direction: "rtl", textAlign: "right" }}>
      <PlaceIcon color="secondary" />
      <Typography component="span" className={classes.title}>
        {Header}
      </Typography>
      <Paper className={classes.paper}>
        <Typography component="span" className={classes.details}>
          {Title}
        </Typography>
        <br />
        <Typography component="span" className={classes.details}>
          {Details}
        </Typography>
      </Paper>
    </div>
  );
};

export default withTheme(AddressView);
