import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useStoreState, useStoreActions } from "easy-peasy";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const useStyles = makeStyles({
  rootMobile: {
    // position: "absolute",
    width: "100%",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
  },
  componentContainerMobile: {
    height: "calc(100vh - 245px)",
    width: "100%",
  },
  title: {
    fontSize: "14px",
    // height: "80px",
  },
});
const MobilePanel = (props) => {
  const classes = useStyles();
  const expanded = useStoreState((state) => state.mainStore.expanded);
  const setExpaned = useStoreActions((actions) => actions.mainStore.setExpaned);

  const handleClose = (event) => {
    event.stopPropagation();
    setExpaned(false);
    props.history.goBack();
  };

  const handleChange = () => setExpaned(!expanded);
  return (
    <Paper
      elevation={0}
      className={classes.rootMobile}
      style={{
        top: props.top,
        bottom: props.bottom,
        zIndex: "500",
        position: props.position,
      }}
    >
      <ExpansionPanel expanded={expanded} onChange={handleChange}>
        <ExpansionPanelSummary
          expandIcon={
            props.showClose ? (
              <ExpandLessIcon style={{ padding: "0" }} />
            ) : (
              <ExpandMoreIcon style={{ padding: "0" }} />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {props.showClose && (
            <IconButton aria-label="close" onClick={handleClose}>
              <Close className={classes.iconColor} />
            </IconButton>
          )}
          <Typography
            className={classes.title}
            style={{ margin: props.showClose ? "10px" : "3px" }}
          >
            {props.title}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: "0" }}>
          <Paper elevation={0} className={classes.componentContainerMobile}>
            {props.children}
          </Paper>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
};
export default withRouter(MobilePanel);
