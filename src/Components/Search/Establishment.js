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
import EstablishmentResult from "./EstablishmentResult";

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

const Establishment = (props) => {
  const classes = useStyles();
  const [showClearIcon, setShowClearIcon] = useState("");
  const [searchText, setSearchText] = useState("");
  const language = useStoreState((state) => state.mainStore.language);
  const fetchMainFrameEstablishments = useStoreActions(
    (actions) => actions.mainStore.fetchMainFrameEstablishments
  );
  const setMainFrameEstablishments = useStoreActions(
    (actions) => actions.mainStore.setMainFrameEstablishments
  );
  const isMobile = useStoreState((state) => state.mainStore.isMobile);

  const mainFrameEstablishments = useStoreState(
    (state) => state.mainStore.mainFrameEstablishments
  );

  const establishmentsAddress = useStoreState(
    (state) => state.mainStore.establishmentsAddress
  );
  const handleClear = () => {
    setSearchText("");
    setShowClearIcon(false);
    setMainFrameEstablishments(null);
  };

  const handleSearch = () => {
    setShowClearIcon(true);
    fetchMainFrameEstablishments(searchText);
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
    if (e.key === "Enter") fetchMainFrameEstablishments(searchText);
  };
  return (
    <>
      <Paper
        className={classes.root}
        style={language === "ar" ? { right: 10 } : { left: 10 }}
        elevation={1}
      >
        <InputBase
          className={classes.input}
          placeholder={strings.searchinestablishments}
          inputProps={{ "aria-label": strings.searchinestablishments }}
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
      <Paper
        style={{
          height: isMobile ? "calc(100vh - 175px)" : "calc(100vh - 185px)",
          overflowY: "auto",
        }}
      >
        <EstablishmentResult
          data={mainFrameEstablishments}
          address={establishmentsAddress && establishmentsAddress[0]}
        />
      </Paper>
    </>
  );
};

export default withRouter(Establishment);
