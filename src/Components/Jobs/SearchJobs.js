import React, { useState, useEffect } from "react";
import {
  IconButton,
  Divider,
  Paper,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
import { Clear as ClearIcon, Search as SearchIcon } from "@material-ui/icons";
import { useStoreActions, useStoreState } from "easy-peasy";
import { withRouter } from "react-router-dom";
import strings from "../Localizations/Localizations";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "right",
    width: "auto",
    zIndex: 2000,
    marginBottom: "1px",
    direction: "rtl",
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  fabProgress: {
    position: "absolute",
    color: theme.palette.fabProgress,
    top: 0,
    zIndex: 1,
  },
  searchInThisPlace: {
    position: "fixed",
    top: "5px",
    zIndex: 2000,
    backgroundColor: "none",
    background: "none",
  },
  input: {
    width: "100%",
  },
}));

const SearchJobs = (props) => {
  const classes = useStyles();
  const [showClearIcon, setShowClearIcon] = useState("");
  const [searchText, setSearchText] = useState("");
  const language = useStoreState((state) => state.mainStore.language);
  const fetchJobs = useStoreActions((actions) => actions.mainStore.fetchJobs);
  const jobs = useStoreState((state) => state.mainStore.jobs);

  useEffect(() => {
    if (!jobs) fetchJobs("");
    //eslint-disable-next-line
  }, []);

  const handleClear = () => {
    setSearchText("");
    setShowClearIcon(false);
    fetchJobs("");
  };

  const handleSearch = () => {
    setShowClearIcon(true);
    fetchJobs(searchText);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (!value || value === "") {
      setShowClearIcon(false);
      setSearchText("");
    } else {
      setShowClearIcon(true);
      setSearchText(value);
    }
  };

  const handleKeyDownSearch = (e) => {
    if (e.key === "Enter") fetchJobs(searchText);
  };
  return (
    <Paper
      className={classes.root}
      style={language === "ar" ? { right: 10 } : { left: 10 }}
      elevation={1}
    >
      <InputBase
        className={classes.input}
        placeholder="بحث في الطلبات"
        inputProps={{ "aria-label": "بحث في الطلبات" }}
        value={searchText}
        onKeyDown={handleKeyDownSearch}
        onChange={handleInputChange}
      />
      {showClearIcon && (
        <Tooltip title={strings.clear}>
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="Search"
            onClick={handleClear}
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
      )}
      <Divider className={classes.divider} orientation="vertical" />
      <Tooltip title={strings.search}>
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default withRouter(SearchJobs);
