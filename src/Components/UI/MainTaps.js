import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import strings from "../Localizations/Localizations";
import { useStoreState, useStoreActions } from "easy-peasy";
import { withRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import History from "../Jobs/History";
import JobsList from "../Jobs/JobsList";
import Job from "../Jobs/Job";
import SearchComponent from "../Search/SearchComponent";
import Establishment from "../Search/Establishment";
import Search from "@material-ui/icons/Search";
import Map from "@material-ui/icons/Map";
import WorkIcon from "@material-ui/icons/Work";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    zIndex: "99",
  },
  appbar: {
    position: "fixed",
    zIndex: "99",
    bottom: "0px",
  },
}));

function MainTabs(props) {
  const classes = useStyles();
  const isMobile = useStoreState((state) => state.mainStore.isMobile);
  const tabValue = useStoreState((state) => state.mainStore.tabValue);
  const setTabValue = useStoreActions(
    (actions) => actions.mainStore.setTabValue
  );
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleTapChange = (event) => {
    const id = event.currentTarget.id;
    if (id === "tab1") props.history.push("/JobsList");
    else if (id === "tab2") props.history.push("/Search");
    else if (id === "tab4") props.history.push("/Establishment");
    else props.history.push("/Map");
  };
  return (
    <>
      {
        <div
          className={classes.root}
          style={
            isMobile
              ? { marginTop: "50px", width: "100%" }
              : { marginTop: "64px", width: "50%" }
          }
        >
          <AppBar
            position="static"
            className={classes.appbar}
            color="primary"
            dir="rtl"
            style={
              isMobile
                ? { marginTop: "50px", width: "100%" }
                : { marginTop: "64px", width: "50%" }
            }
          >
            <Tabs
              value={tabValue}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              {isMobile && (
                <Tab
                  label={strings.map}
                  icon={<Map />}
                  onClick={handleTapChange}
                  {...a11yProps(3)}
                  id="tab5"
                />
              )}
              <Tab
                label={strings.joblist}
                icon={<WorkIcon />}
                onClick={handleTapChange}
                {...a11yProps(0)}
                id="tab1"
              />
              <Tab
                label={strings.search}
                onClick={handleTapChange}
                {...a11yProps(1)}
                icon={<Search />}
                id="tab2"
              />
            </Tabs>
          </AppBar>
          <Switch>
            <Redirect exact path="/" to="/JobsList" />
            <Route path="/Search" component={SearchComponent} />
            <Route path="/JobsList" component={JobsList} />
            <Route path="/JobHistory/:JobId" component={History} />
            <Route path="/Job/:JobId" component={Job} />
            <Route path="/Establishment" component={Establishment} />
          </Switch>
        </div>
      }
    </>
  );
}

export default withRouter(MainTabs);
