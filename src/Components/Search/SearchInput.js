import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import {
  Room,
  PersonPin,
  AccessTime,
  Favorite,
  LocalOffer,
} from "@material-ui/icons";
import { useStoreActions, useStoreState } from "easy-peasy";
import { withRouter } from "react-router-dom";
import Autosuggest from "react-autosuggest";

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    direction: "rtl",
    maxWidth: "400px",
  },
}));

const SearchInput = (props) => {
  const classes = useStyles();
  const language = useStoreState((state) => state.mainStore.language);
  const searchText = useStoreState((state) => state.mainStore.searchText);
  const suggestions = useStoreState((state) => state.mainStore.suggestions);

  const setShowClearIcon = useStoreActions(
    (actions) => actions.mainStore.setShowClearIcon
  );
  const setSearchText = useStoreActions(
    (actions) => actions.mainStore.setSearchText
  );
  const setStartIndex = useStoreActions(
    (actions) => actions.mainStore.setStartIndex
  );
  const fetchSuggestions = useStoreActions(
    (actions) => actions.mainStore.fetchSuggestions
  );

  const setSuggestions = useStoreActions(
    (actions) => actions.mainStore.setSuggestions
  );
  const fetchSearchResult = useStoreActions(
    (actions) => actions.mainStore.fetchSearchResult
  );
  const getSuggestionValue = (suggestion) =>
    language === "ar" ? suggestion.TitleArabic : suggestion.TitleEnglish;

  const getIcon = (FeatureType) => {
    switch (FeatureType) {
      case "Category":
        return <LocalOffer />;
      case "History":
        return <AccessTime />;
      case "Funeral":
        return <PersonPin />;
      case "Favorite":
        return <Favorite color="secondary" />;
      default:
        return <Room />;
    }
  };

  const renderSuggestion = (suggestion) => {
    return (
      <>
        <Grid container spacing={0}>
          <Grid item xs={1}>
            {getIcon(suggestion.FeatureType)}
          </Grid>
          <Grid item xs={11}>
            {language === "ar"
              ? suggestion.TitleArabic
              : suggestion.TitleEnglish}
          </Grid>
        </Grid>
      </>
    );
  };

  const handleInputChange = (event, data) => {
    const value = data.newValue;
    if (!value || value === "") {
      setShowClearIcon(false);
      setSearchText("");
    } else {
      setShowClearIcon(true);
      setSearchText(value);
    }
  };

  const onSuggestionsFetchRequested = (data) => fetchSuggestions(data.value);

  const onSuggestionsClearRequested = () => setSuggestions([]);

  const onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    setStartIndex(0);
    fetchSearchResult();
    if (!suggestionValue || suggestionValue === "") {
      // props.history.push("/Search/");
    } else {
      //props.history.push("/Search/" + suggestionValue);
    }
  };

  const shouldRenderSuggestions = () => true;

  const handleKeyDownSearch = (e) => {
    if (e.key === "Enter") {
      setStartIndex(0);
      fetchSearchResult();
    }
  };

  const inputProps = {
    placeholder: "ابحث عن عنوان أو جهة",
    value: searchText,
    onKeyDown: handleKeyDownSearch,
    onChange: handleInputChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      shouldRenderSuggestions={shouldRenderSuggestions}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={onSuggestionSelected}
      className={classes.input}
      focusInputOnSuggestionClick={false}
    />
  );
};

export default withRouter(SearchInput);
