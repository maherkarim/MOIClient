import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { useStoreState } from "easy-peasy";
import SearchSkeleton from "./SearchSkeleton";
import { withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import ApartmentIcon from "@material-ui/icons/Apartment";
import Add from "@material-ui/icons/Add";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "auto",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.hover.background,
      color: theme.palette.hover.color,
    },
    margin: "5px",
    padding: "5px",
  },
  title: {
    fontWeight: "500",
    fontSize: "14px",
    padding: "2px",
    color: "black",
  },
  details: {
    padding: "2px",
    fontWeight: "400",
    fontSize: "12px",
  },
}));

const SearchItem = (props) => {
  const classes = useStyles();
  const language = useStoreState((state) => state.mainStore.language);
  const loading = useStoreState((state) => state.mainStore.loading);

  return (
    <>
      {loading ? (
        <>
          <SearchSkeleton showDetails={props.showDetails} />
        </>
      ) : (
        <Paper
          component="div"
          className={classes.paper}
          style={
            language === "ar" ? { textAlign: "right" } : { textAlign: "left" }
          }
          onMouseEnter={(event) =>
            props.onHover(props.document.X, props.document.Y)
          }
          onMouseLeave={(event) => props.onMouseLeave()}
        >
          <Grid className={classes.grid} container spacing={0}>
            <>
              <Grid
                item
                xs={props.document.FeatureType === "Parcel" ? 8 : 10}
                onClick={(event) => props.onSearch(props.document)}
                style={{
                  marginTop: "10px",
                  // borderBottom: "1px solid #f1f1f1"
                }}
              >
                <Typography component="span" className={classes.title}>
                  {language === "ar"
                    ? props.document.TitleArabic
                    : props.document.TitleEnglish}
                </Typography>
                <br />
                {props.document.DetailsArabic && props.showDetails && (
                  <Typography component="span" className={classes.details}>
                    {language === "ar"
                      ? props.document.DetailsArabic
                      : props.document.DetailsEnglish}
                  </Typography>
                )}
              </Grid>

              {props.document.FeatureType === "Parcel" && (
                <Grid
                  item
                  xs={2}
                  style={{
                    marginTop: "7px",
                  }}
                >
                  <IconButton
                    onClick={() => props.onFetchUnits(props.document)}
                  >
                    <ApartmentIcon color="secondary" />
                  </IconButton>
                </Grid>
              )}

              <Grid
                item
                xs={1}
                style={{
                  marginTop: "7px",
                }}
              >
                <IconButton onClick={() => props.onAction(props.document)}>
                  <Add color="primary" />
                </IconButton>
              </Grid>

              {/* {props.document.Unit && (
                <Grid
                  item
                  xs={1}
                  style={{
                    marginTop: "7px",
                  }}
                >
                  <IconButton
                    onClick={() =>
                      props.onDisplayEstablishmentInfo(props.document)
                    }
                  >
                    <InfoIcon color="primary" />
                  </IconButton>
                </Grid>
              )} */}
            </>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default withTheme(SearchItem);
