import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { useStoreState, useStoreActions } from "easy-peasy";
import Slide from "@material-ui/core/Slide";

export default function Toast() {
  const snackbarOption = useStoreState(state => state.mainStore.snackbarOption);

  const setSnackbarOption = useStoreActions(
    actions => actions.mainStore.setSnackbarOption
  );

  const handleClose = () => {
    setSnackbarOption({ open: false });
  };

  function Transition(props) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <div>
      <Snackbar
        style={{ zIndex: "2000" }}
        key={("bottom", "center")}
        open={snackbarOption.open}
        onClose={handleClose}
        TransitionComponent={Transition}
        autoHideDuration={4000}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{snackbarOption.message}</span>}
      />
    </div>
  );
}
