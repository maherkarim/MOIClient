import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { useStoreState } from "easy-peasy";
import moment from "moment";
import "moment/locale/ar";
import { withRouter } from "react-router-dom";
import AppBar from "../UI/AppBar";
import strings from "../Localizations/Localizations";
import { makeStyles, Grid, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import PlaceIcon from "@material-ui/icons/Place";
import ApartmentIcon from "@material-ui/icons/Apartment";
import PersonIcon from "@material-ui/icons/Person";
import DateRangeIcon from "@material-ui/icons/DateRange";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
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
    fontSize: "14px",
    color: "gray",
  },
  divider: {
    height: 28,
    margin: 4,
    marginTop: "13px",
  },
  action: {
    fontWeight: "500",
    fontSize: "14px",
    padding: "2px",
    color: "red",
  },
  icons: {
    marginRight: "10px",
  },
}));

const Job = (props) => {
  const classes = useStyles();
  const [job, setJob] = useState(null);
  const [jobAttachments, setJobAttachments] = useState(null);
  const jobs = useStoreState((state) => state.mainStore.jobs);
  const config = useStoreState((state) => state.mainStore.config);

  useEffect(() => {
    jobs.map((j) => {
      if (j.id === props.match.params.JobId) setJob(j);
    });
    async function fetchMyAPI() {
      const url =
        config.appServerUrl + "GetJobAttachments/" + props.match.params.JobId;
      const response = await axios.get(url);
      const data = await response.data;
      setJobAttachments(data);
    }
    fetchMyAPI();
  }, [props.match.params.JobId]);

  const Com = () => {
    return (
      <>
        <Paper
          style={{
            width: "100%",
            textAlign: "right",
            overflowY: "auto",
            height: " calc(100vh - 182px)",
            direction: "rtl",
          }}
          elevation={0}
        >
          {job && (
            <Paper className={classes.root}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Grid container alignItems="center">
                    <ApartmentIcon color="primary" />
                    <Typography component="span" className={classes.title}>
                      {job.TitleArabic}
                    </Typography>
                    <Divider
                      className={classes.divider}
                      orientation="vertical"
                    />
                    {job.Status && (
                      <Chip
                        label={job.Status === "yes" ? "مخالف" : "غير مخالف"}
                      />
                    )}
                  </Grid>

                  <Grid container alignItems="center">
                    <PlaceIcon color="secondary" />
                    <Typography component="div" className={classes.title}>
                      {job.DetailsArabic}
                    </Typography>
                  </Grid>
                  <Divider />

                  {job.CivilID && (
                    <div className={classes.title}>
                      {strings.parcelpacinumber} : {job.CivilID}
                    </div>
                  )}
                  {job.unit && (
                    <div className={classes.title}>
                      {strings.parcelunitnumber} : {job.Unit}
                    </div>
                  )}
                  <div className={classes.title}>
                    رقم هاتف المنشأة:{job.EOSPhone}
                  </div>

                  <div className={classes.title}>
                    المسمى الوظيفي:{job.EmployeePosition}
                  </div>

                  <div className={classes.title}>
                    رقم المدني للموظف:{job.EmployeeCivilId}
                  </div>

                  <div className={classes.title}>
                    رقم الهاتف للموظف:{job.EmployeePhone}
                  </div>

                  <div className={classes.title}>
                    إسم الموظف:{job.EmployeeName}
                  </div>

                  <div className={classes.title}>الجنسية:{job.Nationality}</div>

                  <div className={classes.title}>
                    عدد الكاميرات الداخلية:{job.InternalCameraCount}
                  </div>

                  <div className={classes.title}>
                    عدد الكاميرات الخارجية:{job.ExternalCameraCount}
                  </div>

                  <div className={classes.title}>
                    عدد الكاميرات الإجمالي:{job.TotalCameraCount}
                  </div>

                  <div className={classes.title}>
                    مدة التسجيل:{job.RecordingDuration}
                  </div>
                  <div className={classes.title}>
                    {strings.systemexistance}:
                    {job.SystemExistance === "yes" ? "نعم" : "لا"}
                  </div>
                  <div className={classes.title}>
                    {strings.systemidentical}:
                    {job.SystemIdentical === "yes" ? "نعم" : "لا"}
                  </div>
                  <div className={classes.title}>الملاحظات:{job.Notes}</div>

                  <Divider />
                  {strings.attachments}
                  <br />
                  <div>
                    {jobAttachments &&
                      jobAttachments.map((ja, idx) => {
                        return (
                          <img
                            alt={ja.fileName}
                            key={idx}
                            src={config.appServerUrl + "uploads/" + ja.filePath}
                            height="50"
                            width="50"
                            style={{ margin: 5, padding: 5 }}
                          />
                        );
                      })}
                  </div>
                  <Divider />

                  <>
                    <Grid container alignItems="center">
                      <Typography component="div" className={classes.title}>
                        {strings.createdby}
                      </Typography>
                      <Divider
                        className={classes.divider}
                        orientation="vertical"
                      />
                      <Chip
                        icon={
                          <PersonIcon color="error" className={classes.icons} />
                        }
                        label={job.Createdby}
                      />
                      <Divider
                        className={classes.divider}
                        orientation="vertical"
                      />
                      <Chip
                        icon={
                          <DateRangeIcon
                            color="error"
                            className={classes.icons}
                          />
                        }
                        label={moment(job.Createdate).format("LLLL")}
                      />
                    </Grid>

                    <Grid container alignItems="center">
                      <Typography component="span" className={classes.title}>
                        {strings.lastupdate}
                      </Typography>
                      <Divider
                        className={classes.divider}
                        orientation="vertical"
                      />
                      <Chip
                        icon={
                          <PersonIcon color="error" className={classes.icons} />
                        }
                        label={job.Updatedby}
                      />
                      <Divider
                        className={classes.divider}
                        orientation="vertical"
                      />
                      <Chip
                        icon={
                          <DateRangeIcon
                            color="error"
                            className={classes.icons}
                          />
                        }
                        label={moment(job.Updatedate).format("LLLL")}
                      />
                    </Grid>
                  </>
                </Grid>
              </Grid>
              <Divider />

              {/* <div style={{ width: "100%" }}>
                <Button
                  style={{ width: "50%" }}
                  onClick={() =>
                    props.history.push(
                      "/jobhistory/" + props.match.params.JobId
                    )
                  }
                  color="primary"
                >
                  {strings.jobhistory}
                </Button>
                <Button
                  style={{ width: "50%" }}
                  onClick={() => {}}
                  color="primary"
                >
                  {strings.edit}
                </Button>
              </div> */}
              <br />
            </Paper>
          )}
        </Paper>
      </>
    );
  };

  return (
    <>
      <AppBar displayText="بيانات الطلب" />
      <Com />
    </>
  );
};

export default withRouter(Job);
