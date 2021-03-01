import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Grid, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import strings from "../Localizations/Localizations";
import Chip from "@material-ui/core/Chip";
import PlaceIcon from "@material-ui/icons/Place";
import ApartmentIcon from "@material-ui/icons/Apartment";
import PersonIcon from "@material-ui/icons/Person";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: "1px solid #ccc",
    width: "auto",
    margin: "5px",
    padding: "5px",
  },
  title: {
    fontWeight: "500",
    fontSize: "14px",
    padding: "2px",
    color: "black",
  },
  details: {
    padding: "2px",
    fontWeight: "400",
    fontSize: "14px",
    color: "gray",
  },
  divider: {
    height: 28,
    margin: 4,
    marginTop: "13px",
  },
  action: {
    fontWeight: "500",
    fontSize: "14px",
    padding: "2px",
    color: "red",
  },
  icons: {
    marginRight: "10px",
  },
}));

function JobItem(props) {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.root}>
      <Grid className={classes.grid} container spacing={0}>
        <Grid item xs={12}>
          <Grid container alignItems="center">
            <ApartmentIcon color="primary" />
            <Typography component="span" className={classes.title}>
              {props.document.TitleArabic}
            </Typography>
            <Divider className={classes.divider} orientation="vertical" />
            <Chip
              label={props.document.Status === "yes" ? "مخالف" : "غير مخالف"}
            />
          </Grid>

          <Grid container alignItems="center">
            <PlaceIcon color="secondary" />
            <Typography component="span" className={classes.title}>
              {props.document.DetailsArabic}
            </Typography>
          </Grid>
          <Grid container alignItems="center">
            <Typography component="span" className={classes.title}>
              {strings.lastupdate}
            </Typography>
            <Divider className={classes.divider} orientation="vertical" />
            <Chip
              icon={<PersonIcon color="error" className={classes.icons} />}
              label={props.document.Updatedby}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <Chip
              icon={<DateRangeIcon color="error" className={classes.icons} />}
              label={moment(props.document.Updatedate).format("LLLL")}
            />
          </Grid>
        </Grid>
      </Grid>
      <Divider orientation="horizontal" style={{ margin: "5px" }} />
      <div style={{ width: "100%" }}>
        <Button
          style={{ width: "33%" }}
          onClick={() => props.onZoom(props.document)}
          variant="text"
          color="primary"
        >
          {strings.showdetails}
        </Button>
        <Button
          style={{ width: "34%" }}
          onClick={() => props.onHistory(props.document)}
          variant="text"
          color="primary"
        >
          {strings.jobhistory}
        </Button>
        <Button
          style={{ width: "33%" }}
          onClick={() => props.onAction(props.document)}
          variant="text"
          color="primary"
        >
          {strings.edit}
        </Button>
      </div>
    </Paper>
  );
}

export default JobItem;
