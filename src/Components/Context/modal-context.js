import React, { useCallback, useEffect, useState } from "react";
import strings from "../Localizations/Localizations";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

const ModalContext = React.createContext();

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
const Transition = React.forwardRef((props, ref) => (
  <Slide {...props} direction="up" />
));

const Modal = ({ title, content, maxWidth, closeModal, fullScreen }) => {
  return (
    <Dialog
      onClose={closeModal}
      aria-labelledby="draggable-dialog-title"
      open={true}
      //   dir={"rtl"}
      maxWidth={maxWidth}
      TransitionComponent={Transition}
      PaperComponent={PaperComponent}
      style={{ minHeight: "600px" }}
      fullScreen={fullScreen}
    >
      <DialogTitle
        id="draggable-dialog-title"
        style={{ direction: "rtl", textAlign: "right" }}
      >
        {title}
      </DialogTitle>
      <DialogContent style={{ marginTop: 0, marginBottom: 0 }}>
        {content}
      </DialogContent>
      <DialogActions dir="ltr">
        <Button onClick={closeModal} color="default">
          {strings.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ModalProvider = (props) => {
  const [modal, setModal] = useState();
  const closeModal = useCallback(() => {
    setModal();
  }, [setModal]);
  return (
    <ModalContext.Provider value={{ closeModal, setModal }} {...props}>
      {props.children}
      {modal && (
        <Modal
          modal={modal}
          closeModal={closeModal}
          title={modal.title}
          content={modal.content}
          maxWidth={modal.maxWidth}
          fullScreen={modal.fullScreen}
        />
      )}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};

export { ModalProvider, useModal };
