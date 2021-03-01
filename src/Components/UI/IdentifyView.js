import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ApartmentIcon from "@material-ui/icons/Apartment";
import { makeStyles } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useModal } from "../Context/modal-context";
import strings from "../Localizations/Localizations";
import Units from "./Units";
import MOIForm from "../Forms/MOIForm";

const useStyles = makeStyles({
  title: {
    fontWeight: "500",
    fontSize: "14px",
    padding: "2px",
  },
  details: {
    padding: "2px",
    fontWeight: "400",
    fontSize: "12px",
  },
});

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

const IdentifyView = ({ address }) => {
  const { setModal } = useModal();

  const classes = useStyles();
  const isMobile = useStoreState((state) => state.mainStore.isMobile);
  const fetchUnits = useStoreActions((actions) => actions.mainStore.fetchUnits);

  return (
    <Grid container spacing={0} style={{ width: "auto", direction: "rtl" }}>
      <>
        <Grid
          item
          xs={address.FeatureType === "Parcel" ? 8 : 10}
          style={{
            marginTop: "10px",
          }}
        >
          <Typography component="span" className={classes.title}>
            {address.TitleArabic}
          </Typography>
          <br />

          <Typography component="span" className={classes.details}>
            {address.DetailsArabic}
          </Typography>
        </Grid>

        {address.FeatureType === "Parcel" && (
          <Grid
            item
            xs={2}
            style={{
              marginTop: "7px",
            }}
          >
            <IconButton
              onClick={() => {
                fetchUnits(address.CivilID);
                setModal({
                  title: strings.units,
                  content: <Units />,
                  maxWidth: "sm",
                  fullScreen: isMobile,
                });
              }}
            >
              <ApartmentIcon color="secondary" />
            </IconButton>
          </Grid>
        )}

        <Grid
          item
          xs={2}
          style={{
            marginTop: "7px",
          }}
        >
          <IconButton
            onClick={() => {
              setModal({
                title: strings.form,
                content: (
                  <MOIForm
                    address={address}
                    isEdit={false}
                    initState={initState}
                  />
                ),
                maxWidth: "sm",
                fullScreen: isMobile,
              });
            }}
          >
            <Add color="primary" />
          </IconButton>
        </Grid>
      </>
    </Grid>
  );
};

export default IdentifyView;
