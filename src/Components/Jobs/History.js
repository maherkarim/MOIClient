import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
import AppBar from "../UI/AppBar";
import moment from "moment";
import { useStoreState, useStoreActions } from "easy-peasy";
import "moment/locale/ar";
import Chip from "@material-ui/core/Chip";
import PersonIcon from "@material-ui/icons/Person";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { makeStyles, Grid, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import strings from "../Localizations/Localizations";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "auto",
    // cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.hover.background,
      color: theme.palette.hover.color,
    },
    margin: "10px",
    padding: "10px",
  },
  title: {
    fontWeight: "500",
    fontSize: "14px",
    padding: "2px",
    color: "black",
  },

  divider: {
    height: 28,
    margin: 4,
    marginTop: "13px",
  },
}));

const History = (props) => {
  const classes = useStyles();
  const jobLogs = useStoreState((state) => state.mainStore.jobLogs);
  const fetchJobLogs = useStoreActions(
    (actions) => actions.mainStore.fetchJobLogs
  );
  useEffect(() => {
    fetchJobLogs(props.match.params.JobId);
  }, [props.match.params.JobId]);

  const Com = () => {
    return (
      <Paper
        style={{
          width: "100%",
          textAlign: "right",
          overflowY: "auto",
          height: " calc(100vh - 160px)",
          direction: "rtl",
        }}
        elevation={0}
      >
        {jobLogs &&
          jobLogs.map((job, index) => (
            <Paper key={index} className={classes.paper} elevation={1}>
              <Chip label={job.Status === "yes" ? "مخالف" : "غير مخالف"} />
              <Grid container alignItems="center">
                <PersonIcon />
                <Typography component="span" className={classes.title}>
                  {job.createdby}
                </Typography>
                <Divider className={classes.divider} orientation="vertical" />
                <Typography component="span" className={classes.title}>
                  {strings.org + " : " + job.EntityName}
                </Typography>
                <Divider className={classes.divider} orientation="vertical" />
                <DateRangeIcon />
                <Typography component="span" className={classes.title}>
                  {moment(job.Updatedate).format("LLLL")}
                </Typography>
              </Grid>
            </Paper>
          ))}
      </Paper>
    );
  };

  return (
    <>
      <AppBar displayText={strings.jobhistory} />
      <Com />
    </>
  );
};

export default withRouter(History);
