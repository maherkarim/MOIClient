import React from "react";
import { makeStyles } from "@material-ui/core";
import { useStoreState, useStoreActions } from "easy-peasy";
import SearchSkeleton from "./SearchSkeleton";
import { withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ApartmentIcon from "@material-ui/icons/Apartment";
import PlaceIcon from "@material-ui/icons/Place";
import Button from "@material-ui/core/Button";
import strings from "../Localizations/Localizations";
import { useModal } from "../Context/modal-context";
import MOIForm from "../Forms/MOIForm";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "500",
    fontSize: "16px",
    padding: "2px",
    color: "black",
  },
  details: {
    padding: "2px",
    fontWeight: "400",
    fontSize: "14px",
    color: "gray",
  },
  paper: {
    padding: "7px",
    margin: "7px",
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
const EstablishmentResult = (props) => {
  const classes = useStyles();
  const language = useStoreState((state) => state.mainStore.language);
  const loading = useStoreState((state) => state.mainStore.loading);

  const { setModal } = useModal();

  const isMobile = useStoreActions((actions) => actions.mainStore.isMobile);

  if (loading) return <SearchSkeleton showDetails={true} />;

  return (
    <>
      {props.data && (
        <Paper
          style={
            language === "ar" ? { textAlign: "right" } : { textAlign: "left" }
          }
          elevation={0}
          className={classes.paper}
        >
          <ApartmentIcon color="primary" />
          <Typography component="span" className={classes.title}>
            بيانات الجهة
          </Typography>
          <Paper className={classes.paper}>
            <Typography component="span" className={classes.details}>
              إسم الجهة:{" "}
              {props.data.CommercialName === ""
                ? props.data.PlateName
                : props.data.CommercialName}
            </Typography>
            <br />

            <Typography component="span" className={classes.details}>
              إسم المالك: {props.data.OwnerName}
            </Typography>
            <br />

            <Typography component="span" className={classes.details}>
              رقم الرخصة : {props.data.LicenseNumber}
            </Typography>
            <br />
            <Typography component="span" className={classes.details}>
              الرقم المدني للجهة:
              {props.data.EstablishmentCivilID}
            </Typography>
          </Paper>

          {props.address && (
            <>
              <PlaceIcon color="secondary" />
              <Typography component="span" className={classes.title}>
                عنوان الجهة
              </Typography>
              <Paper className={classes.paper}>
                <Typography component="span" className={classes.details}>
                  {props.address.TitleArabic}
                </Typography>
                <br />
                <Typography component="span" className={classes.details}>
                  {props.address.DetailsArabic}
                </Typography>
              </Paper>
            </>
          )}
          <br />
          <div style={{ textAlign: "center" }}>
            <Button
              style={{ width: "120px" }}
              onClick={() => {
                setModal({
                  title: strings.form,
                  content: (
                    <MOIForm
                      address={props.address}
                      isEdit={false}
                      initState={initState}
                    />
                  ),
                  maxWidth: "md",
                  fullScreen: isMobile,
                });
              }}
              variant="text"
              color="primary"
            >
              {strings.takeaction}
            </Button>
          </div>
          <br />
        </Paper>
      )}
    </>
  );
};

export default withTheme(EstablishmentResult);
