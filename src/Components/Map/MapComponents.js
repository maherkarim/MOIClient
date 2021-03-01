import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import strings from "../Localizations/Localizations";
import AddIcon from "@material-ui/icons/AddCircle";
import Home from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";
import Remove from "@material-ui/icons/RemoveCircle";
import { useStoreState, useStoreActions } from "easy-peasy";
import { withRouter } from "react-router-dom";
import { withTheme } from "@material-ui/core/styles";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import MyLocationIcon from "@material-ui/icons/MyLocation";

const useStyles = makeStyles((theme) => ({
  fabmargin: {
    marginBottom: "5px",
  },
  container: { position: "fixed", bottom: "10px", left: "10px" },
  mobileContainer: { position: "fixed", bottom: "70px", left: "10px" },
}));

const MapComponents = (props) => {
  const classes = useStyles();
  const config = useStoreState((state) => state.mainStore.config);
  const isMobile = useStoreState((state) => state.mainStore.isMobile);

  const setMyLocation = useStoreActions(
    (actions) => actions.mainStore.setMyLocation
  );

  const handleZoomIn = () => {
    props.view.goTo({
      target: props.view.center,
      zoom: props.view.zoom + 1,
    });
  };

  const handleZoomOut = () => {
    props.view.goTo({
      target: props.view.center,
      zoom: props.view.zoom - 1,
    });
  };

  const handleHome = () => {
    props.view.goTo({
      target: [config.mapping.centerX, config.mapping.centerY],
      zoom: 8,
    });
  };

  const handleClear = () => {
    const geometryGL = props.view.map.findLayerById("geometryGL");
    if (geometryGL) geometryGL.removeAll();
    const highLightGL = props.view.map.findLayerById("highLightGL");
    if (highLightGL) highLightGL.removeAll();
    const resultGL = props.view.map.findLayerById("resultGL");
    if (resultGL) resultGL.removeAll();
    const myLocation = props.view.map.findLayerById("myLocation");
    if (myLocation) myLocation.removeAll();
    props.view.graphics.removeAll();
    props.view.surface.style.cursor = "";
  };

  const ZoomUI = () => {
    return (
      <>
        <Tooltip title={strings.homeview} placement="right-start">
          <Fab
            size="small"
            color="secondary"
            aria-label="add"
            className={classes.fabmargin}
            onClick={handleHome}
          >
            <Home />
          </Fab>
        </Tooltip>
        <br />
        <Tooltip title={strings.zoomin} placement="right-start">
          <Fab
            size="small"
            color="primary"
            aria-label="zoomin"
            className={classes.fabmargin}
            onClick={handleZoomIn}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <br />
        <Tooltip title={strings.zoomout} placement="right-start">
          <Fab
            size="small"
            color="primary"
            aria-label="zoomout"
            className={classes.fabmargin}
            onClick={handleZoomOut}
          >
            <Remove />
          </Fab>
        </Tooltip>
        <br />

        <Tooltip title="موقعك الحالي" placement="right-start">
          <Fab
            size="small"
            color={"default"}
            aria-label="zoomout"
            className={classes.fabmargin}
            onClick={() => {
              navigator.geolocation.getCurrentPosition((position) => {
                setMyLocation(position);
              });
            }}
          >
            <MyLocationIcon />
          </Fab>
        </Tooltip>
        <br />

        <Tooltip title="مسح الكل" placement="right-start">
          <Fab
            size="small"
            color={"default"}
            aria-label="zoomout"
            className={classes.fabmargin}
            onClick={handleClear}
          >
            <ClearAllIcon />
          </Fab>
        </Tooltip>
      </>
    );
  };

  return (
    <div className={isMobile ? classes.mobileContainer : classes.container}>
      <ZoomUI />
    </div>
  );
};

export default withTheme(withRouter(MapComponents));
