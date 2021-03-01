import React from "react";
import { withRouter } from "react-router-dom";
import Search from "./Search";
import SearchResult from "./SearchResult";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Strings from "../Localizations/Localizations";
import Establishment from "../Search/Establishment";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={0}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
const SearchComponent = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => setValue(newValue);
  return (
    <>
      <AppBar position="sticky" color="primary" elevation={0}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label={Strings.addresses} />
          <Tab label={Strings.establishment} />
        </Tabs>
      </AppBar>

      <Paper
        elevation={0}
        style={{ padding: "0!important", height: "auto", minHeight: "300px" }}
      >
        <TabPanel value={value} index={0}>
          <>
            <Search />
            <SearchResult />
          </>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Establishment />
        </TabPanel>
      </Paper>
    </>
  );
};

export default withRouter(SearchComponent);
