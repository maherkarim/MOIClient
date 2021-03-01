import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

const ToastContext = React.createContext();

const Transition = React.forwardRef((props, ref) => (
  <Slide {...props} direction="up" />
));

const Toast = ({ message }) => {
  console.log(message);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(message ? true : false);
  }, [message]);

  return (
    <Snackbar
      style={{ zIndex: "2000" }}
      key={("bottom", "center")}
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
      autoHideDuration={4000}
      ContentProps={{
        "aria-describedby": "message-id",
      }}
      message={<span id="message-id">{message}</span>}
    />
  );
};

const ToastProvider = (props) => {
  const [toast, setToast] = useState();

  return (
    <ToastContext.Provider value={{ setToast }} {...props}>
      {props.children}
      {toast && <Toast message={toast.message} />}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

export { ToastProvider, useToast };
