import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import SearchJobs from "./SearchJobs";
import { withRouter } from "react-router-dom";
import "moment/locale/ar";
import JobItem from "./JobItem";
import Paper from "@material-ui/core/Paper";
import { useModal } from "../Context/modal-context";
import MOIForm from "../Forms/MOIForm";
import strings from "../Localizations/Localizations";

function JobsList(props) {
  const { setModal } = useModal();

  const fetchShapeJSON = useStoreActions(
    (actions) => actions.mainStore.fetchShapeJSON
  );
  const jobs = useStoreState((state) => state.mainStore.jobs);
  const isMobile = useStoreState((state) => state.mainStore.isMobile);

  const handleAction = (document) => {
    console.log(document);
    setModal({
      title: strings.form,
      content: (
        <MOIForm address={document} isEdit={true} initState={document} />
      ),
      maxWidth: "sm",
      fullScreen: isMobile,
    });
  };

  const handleZoom = (document) => {
    fetchShapeJSON(document.id);
    props.history.push("/job/" + document.id);
  };

  const handleHistory = (document) =>
    props.history.push("/jobhistory/" + document.id);

  return (
    <>
      <SearchJobs />
      <Paper
        style={{
          height: isMobile ? "calc(100vh - 175px)" : "calc(100vh - 185px)",
          overflowY: "auto",
        }}
      >
        {jobs &&
          jobs.map((document, index) => (
            <JobItem
              document={document}
              index={index}
              key={index}
              onHistory={handleHistory}
              onZoom={handleZoom}
              onAction={handleAction}
            />
          ))}
      </Paper>
    </>
  );
}

export default withRouter(JobsList);
