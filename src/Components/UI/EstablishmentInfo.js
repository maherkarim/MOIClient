import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import { useStoreActions, useStoreState } from "easy-peasy";
import EstablishmentResult from "../Search/EstablishmentResult";
import strings from "../Localizations/Localizations";

const Transition = React.forwardRef((props, ref) => (
  <Slide {...props} direction="up" />
));

const EstablishmentInfo = (props) => {
  const setOpenEstablishmentInfo = useStoreActions(
    (actions) => actions.mainStore.setOpenEstablishmentInfo
  );

  const openEstablishmentInfo = useStoreState(
    (state) => state.mainStore.openEstablishmentInfo
  );
  const mainFrameEstablishmentSearch = useStoreState(
    (state) => state.mainStore.mainFrameEstablishmentSearch
  );

  const document = useStoreState((state) => state.mainStore.document);

  return (
    <Dialog
      aria-labelledby="draggable-dialog-title"
      open={openEstablishmentInfo}
      dir={"rtl"}
      TransitionComponent={Transition}
      // fullScreen={isMobile}
      minWidth="lg"
    >
      <DialogContent>
        {mainFrameEstablishmentSearch ? (
          <EstablishmentResult
            data={mainFrameEstablishmentSearch.Establishment}
            address={document}
          />
        ) : (
          <>{strings.nodataforestablishment}</>
        )}
      </DialogContent>
      <DialogActions dir="ltr">
        <Button
          onClick={() => {
            setOpenEstablishmentInfo(false);
          }}
          color="default"
        >
          عودة
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EstablishmentInfo;
