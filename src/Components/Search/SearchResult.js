import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import SearchItem from "./SearchItem";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import { useModal } from "../Context/modal-context";
import strings from "../Localizations/Localizations";
import MOIForm from "../Forms/MOIForm";
import Units from "../UI/Units";

const useStyles = makeStyles((theme) => ({
  itemResult: {
    width: "auto",
    height: "100%",
    marginTop: "5px",
    position: "inherit",
  },
}));

const initState = {
  EOSPhone: "",
  EmployeePosition: "",
  EmployeeCivilId: "",
  EmployeePhone: "",
  EmployeeName: "",
  Nationality: "",
  InternalCameraCount: "",
  ExternalCameraCount: "",
  TotalCameraCount: "",
  RecordingDuration: "",
  Notes: "",
  Status: "yes",
  SystemExistance: "yes",
  SystemIdentical: "yes",
};

const SearchResult = () => {
  const classes = useStyles();
  const { setModal } = useModal();

  const searchResult = useStoreState((state) => state.mainStore.searchResult);
  const isMobile = useStoreState((state) => state.mainStore.isMobile);

  const fetchUnits = useStoreActions((actions) => actions.mainStore.fetchUnits);
  const fetchShapeJSON = useStoreActions(
    (actions) => actions.mainStore.fetchShapeJSON
  );
  const setHighLightPoint = useStoreActions(
    (actions) => actions.mainStore.setHighLightPoint
  );

  const fetchSearchResult = useStoreActions(
    (actions) => actions.mainStore.fetchSearchResult
  );
  const setStartIndex = useStoreActions(
    (actions) => actions.mainStore.setStartIndex
  );

  const fetchMainFrameEstablishmentSearch = useStoreActions(
    (actions) => actions.mainStore.fetchMainFrameEstablishmentSearch
  );

  const handleAction = (document) => {
    fetchShapeJSON(document.ID);
    setModal({
      title: strings.form,
      content: (
        <MOIForm address={document} isEdit={false} initState={initState} />
      ),
      maxWidth: "sm",
      fullScreen: isMobile,
    });
  };

  const handleEstablishmentInfo = (document) => {
    // setDocument(document);
    // setJob(document);
    fetchMainFrameEstablishmentSearch(document.Unit);
  };

  const handleFetchUnits = (document) => {
    fetchUnits(document.CivilID);
    setModal({
      title: strings.establishment,
      content: <Units />,
      maxWidth: "md",
      fullScreen: isMobile,
    });
  };

  const handleHover = (X, Y) => setHighLightPoint({ X, Y });

  const handleScroll = (event) => {
    if (!searchResult) return;
    if (searchResult.length < 20) return;
    if (searchResult.length % 20 !== 0) return;

    const { scrollTop, scrollHeight, offsetHeight } = event.target;
    if (parseInt(scrollTop) === scrollHeight - offsetHeight) {
      setStartIndex(searchResult.length - 1);
      fetchSearchResult();
    }
  };

  return (
    <Paper
      elevation={0}
      style={{
        height: "100vh",
      }}
    >
      <div
        style={{
          height: isMobile ? "calc(100vh - 247px)" : "calc(100vh - 242px)",
          direction: "rtl",
          overflowY: "auto",
          width: "auto",
        }}
        onScroll={handleScroll}
        id="searchResult"
      >
        {searchResult && (
          <Paper className={classes.itemResult} elevation={0}>
            {searchResult &&
              searchResult.map((document, index) => (
                <SearchItem
                  document={document}
                  index={index}
                  key={index}
                  onZoom={() => fetchShapeJSON(document.ID)}
                  onSearch={() => fetchShapeJSON(document.ID)}
                  onHover={handleHover}
                  onMouseLeave={() => setHighLightPoint(null)}
                  showDetails={true}
                  showFavoriteAction={false}
                  onAction={handleAction}
                  onFetchUnits={handleFetchUnits}
                  onDisplayEstablishmentInfo={handleEstablishmentInfo}
                />
              ))}
          </Paper>
        )}
      </div>
    </Paper>
  );
};

export default SearchResult;
