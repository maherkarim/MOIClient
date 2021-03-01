import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { useStoreState } from "easy-peasy";
import Add from "@material-ui/icons/Add";
import { useModal } from "../Context/modal-context";
import strings from "../Localizations/Localizations";
import MOIForm from "../Forms/MOIForm";

const Units = (props) => {
  const { setModal } = useModal();

  const units = useStoreState((state) => state.mainStore.units);
  const loading = useStoreState((state) => state.mainStore.loading);
  const isMobile = useStoreState((state) => state.mainStore.isMobile);

  const handleAction = (document) => {
    setModal({
      title: strings.form,
      content: (
        <MOIForm address={document} isEdit={false} initState={document} />
      ),
      maxWidth: "sm",
      fullScreen: isMobile,
    });
  };

  return (
    <Paper style={{ direction: "rtl", padding: "5px" }} elevation={0}>
      {loading ? (
        <Paper elevation={1}>جارى التحميل</Paper>
      ) : (
        <>
          {units && units.length > 0 ? (
            units.map((unit, index) => (
              <Paper
                key={index}
                style={{ padding: "5px", margin: "5px" }}
                elevation={1}
              >
                <Grid container spacing={0}>
                  <Grid item xs={10}>
                    {unit.TitleArabic}
                    <br />
                    {unit.DetailsArabic}
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={(e) => handleAction(unit)}>
                      <Add />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            ))
          ) : (
            <Paper elevation={1}>لا توجد وحدات مسجلة على هذا المبني</Paper>
          )}
        </>
      )}
    </Paper>
  );
};

export default Units;
