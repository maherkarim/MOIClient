import React from "react";
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
import SearchInput from "./SearchInput";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "right",
    width: "auto",
    zIndex: 2000,
    marginBottom: "1px",
    direction: "rtl",
  },
  iconButton: {
    padding: 10,
    marginTop: "13px",
  },
  divider: {
    height: 28,
    margin: 4,
    marginTop: "13px",
  },

  searchCom: {
    marginTop: "10px",
  },
}));

const Search = (props) => {
  const classes = useStyles();

  const language = useStoreState((state) => state.mainStore.language);
  const searchText = useStoreState((state) => state.mainStore.searchText);
  const showClearIcon = useStoreState((state) => state.mainStore.showClearIcon);
  const loading = useStoreState((state) => state.mainStore.loading);

  const setShowClearIcon = useStoreActions(
    (actions) => actions.mainStore.setShowClearIcon
  );
  const setSearchText = useStoreActions(
    (actions) => actions.mainStore.setSearchText
  );
  const setLoading = useStoreActions((actions) => actions.mainStore.setLoading);
  const fetchSearchResult = useStoreActions(
    (actions) => actions.mainStore.fetchSearchResult
  );
  const setSearchResult = useStoreActions(
    (actions) => actions.mainStore.setSearchResult
  );
  const setStartIndex = useStoreActions(
    (actions) => actions.mainStore.setStartIndex
  );

  const handleClear = () => {
    setSearchText("");
    setSearchResult(null);
    setShowClearIcon(false);
    setLoading(false);
  };

  const handleSearch = () => {
    if (searchText === "") return;
    setStartIndex(0);
    fetchSearchResult();
    setShowClearIcon(true);
  };

  return (
    <>
      <Paper
        className={classes.root}
        style={language === "ar" ? { right: 10 } : { left: 10 }}
        elevation={1}
      >
        <SearchInput className={classes.searchCom} />
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
      {loading && <LinearProgress />}
    </>
  );
};

export default withRouter(Search);
