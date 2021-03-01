import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PACI from "../../Images/PACI.png";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  paper: {
    textAlign: "center",
    padding: "10px",
    margin: "10px",
    marginTop: "100px",
    zIndex: 100,
    backgroundColor: "#434e6f",
  },
  root: {
    position: "fixed",
    zIndex: 2000,
    height: "100vh",
    width: "100vw",
    backgroundColor: "#434e6f",
  },
  progress: {
    marginRight: "35%",
    marginLeft: "35%",
    marginTop: "10px",
  },
});
const ColorLinearProgress = withStyles({
  root: {
    height: 7,
  },
  colorPrimary: {
    backgroundColor: "unset",
  },
  barColorPrimary: { borderRadius: 10 },
})(LinearProgress);

const LoadingPage = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <Paper elevation={0} className={classes.paper}>
        <img src={PACI} height={150} width={150} alt="Logo" />
        {/* <Typography component="h1">{strings.apptitle}</Typography> */}
        <ColorLinearProgress className={classes.progress} />
      </Paper>
    </Paper>
  );
};

export default LoadingPage;
