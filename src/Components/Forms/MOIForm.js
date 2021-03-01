import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/styles";
import strings from "../Localizations/Localizations";
import { DropzoneDialogBase } from "material-ui-dropzone";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import RadioGroup from "@material-ui/core/RadioGroup";
import AddressView from "../UI/AddressView";
import { useStoreActions } from "easy-peasy";
import { useModal } from "../Context/modal-context";
import { useToast } from "../Context/toast-context";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "auto",
    // padding: 5,
    direction: "rtl",
    textAlign: "right",
    float: "right",
  },
  textField: {
    textAlign: "right!important",
  },
}));

const MOIForm = ({ address, isEdit, initState }) => {
  const classes = useStyles();
  const { closeModal } = useModal();
  const { setToast } = useToast();
  const [state, setState] = React.useState(initState);
  const [fileObjects, setFileObjects] = React.useState([]);
  const [openDropzoneDialog, setOpenDropzoneDialog] = React.useState(false);

  const saveJob = useStoreActions((actions) => actions.mainStore.saveJob);

  const handleSaveForm = () => {
    let dataTosave = {
      ...state,
    };
    let images = [];
    fileObjects.map((f) => {
      const {
        file: { name },
      } = f;
      images.push({ name });
    });

    dataTosave.ID = address.ID;
    dataTosave.images = images;
    dataTosave.DetailsArabic = address.DetailsArabic;
    dataTosave.DetailsEnglish = address.DetailsEnglish;
    dataTosave.TitleArabic = address.TitleArabic;
    dataTosave.TitleEnglish = address.TitleEnglish;
    dataTosave.CivilID = address.CivilID;
    dataTosave.Unit = address.Unit;
    dataTosave.FeatureType = address.FeatureType;
    dataTosave.Y = address.Y;
    dataTosave.X = address.X;
    saveJob({ fields: dataTosave, fileObjects: fileObjects, isEdit });
    setState(initState);
    setFileObjects([]);
    closeModal();
    setToast({ message: "تم الإرسال" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    let newState = { ...state };
    newState[name] = value;
    setState(newState);
  };

  return (
    <Paper elevation={0} className={classes.container}>
      <AddressView
        Details={address.DetailsArabic}
        Title={address.TitleArabic}
        Header={strings.theaddress}
      />
      <TextField
        margin="normal"
        required
        variant="filled"
        fullWidth
        name="EOSPhone"
        value={state.EOSPhone}
        label="رقم هاتف المنشأة"
        autoComplete="off"
        className={classes.textField}
        onChange={handleChange}
      />
      <br />
      <TextField
        margin="normal"
        required
        variant="filled"
        fullWidth
        name="EmployeePosition"
        value={state.EmployeePosition}
        label="المسمى الوظيفي"
        autoComplete="off"
        className={classes.textField}
        onChange={handleChange}
      />
      <br />
      <TextField
        margin="normal"
        required
        variant="filled"
        fullWidth
        name="EmployeeCivilId"
        value={state.EmployeeCivilId}
        label="رقم المدني  للموظف"
        autoComplete="off"
        className={classes.textField}
        onChange={handleChange}
      />
      <br />
      <TextField
        margin="normal"
        required
        variant="filled"
        fullWidth
        name="EmployeePhone"
        value={state.EmployeePhone}
        label="رقم الهاتف للموظف"
        autoComplete="off"
        className={classes.textField}
        onChange={handleChange}
      />
      <br />
      <TextField
        margin="normal"
        required
        variant="filled"
        fullWidth
        name="EmployeeName"
        value={state.EmployeeName}
        label="إسم الموظف"
        autoComplete="off"
        className={classes.textField}
        onChange={handleChange}
      />
      <br />
      <TextField
        margin="normal"
        required
        variant="filled"
        fullWidth
        name="Nationality"
        value={state.Nationality}
        label="الجنسية"
        autoComplete="off"
        className={classes.textField}
        onChange={handleChange}
      />
      <br />
      <TextField
        margin="normal"
        required
        variant="filled"
        fullWidth
        name="InternalCameraCount"
        value={state.InternalCameraCount}
        label="عدد الكاميرات الداخلية"
        onChange={handleChange}
        autoComplete="off"
        className={classes.textField}
      />
      <br />
      <TextField
        margin="normal"
        required
        variant="filled"
        fullWidth
        name="ExternalCameraCount"
        value={state.ExternalCameraCount}
        label="عدد الكاميرات الخارجية"
        onChange={handleChange}
        autoComplete="off"
        className={classes.textField}
      />
      <br />
      <TextField
        margin="normal"
        required
        variant="filled"
        fullWidth
        name="TotalCameraCount"
        value={state.TotalCameraCount}
        label="عدد الكاميرات الإجمالي"
        onChange={handleChange}
        autoComplete="off"
        className={classes.textField}
      />
      <br />
      <TextField
        margin="normal"
        required
        variant="filled"
        fullWidth
        name="RecordingDuration"
        value={state.RecordingDuration}
        label="مدة التسجيل"
        onChange={handleChange}
        autoComplete="off"
        className={classes.textField}
      />
      <br />
      <TextField
        margin="normal"
        required
        variant="filled"
        multiline
        rowsMax={7}
        fullWidth
        name="Notes"
        value={state.Notes}
        label="الملاحظات"
        onChange={handleChange}
        autoComplete="off"
        className={classes.textField}
      />
      <br />

      <table style={{ width: "100%", direction: "rtl", textAlign: "right" }}>
        <tbody>
          <tr>
            <td>
              <span>{strings.systemexistance}:</span>
            </td>
            <td>
              <RadioGroup
                aria-label="systemexistance"
                name="SystemExistance"
                value={state.SystemExistance}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio color="primary" />}
                  label="نعم"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="primary" />}
                  label="لا"
                />
              </RadioGroup>
            </td>
          </tr>
          <tr>
            <td>
              <span>{strings.systemidentical}:</span>
            </td>
            <td>
              <RadioGroup
                aria-label="systemidentical"
                name="SystemIdentical"
                value={state.SystemIdentical}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio color="primary" />}
                  label="نعم"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="primary" />}
                  label="لا"
                />
              </RadioGroup>
            </td>
          </tr>

          <tr>
            <td>
              <span>{strings.status}:</span>
            </td>
            <td>
              <RadioGroup
                aria-label="statusl"
                name="Status"
                value={state.Status}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio color="primary" />}
                  label="مخالف"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="primary" />}
                  label="غير مخالف"
                />
              </RadioGroup>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ textAlign: "right" }}>
        <Button
          color="default"
          variant="outlined"
          onClick={() => setOpenDropzoneDialog(true)}
        >
          <AttachFileIcon />
          {strings.attachments}
        </Button>
      </div>

      <DropzoneDialogBase
        dialogTitle={strings.attachments}
        dropzoneText={strings.dropzoneText}
        acceptedFiles={["image/*"]}
        fileObjects={fileObjects}
        cancelButtonText={strings.back}
        submitButtonText={strings.done}
        previewText={strings.attachedimages}
        onAdd={(newFileObjs) =>
          setFileObjects([].concat(fileObjects, newFileObjs))
        }
        onDelete={(deleteFileObj) =>
          setFileObjects(fileObjects.filter((f) => f !== deleteFileObj))
        }
        maxFileSize={5242880}
        open={openDropzoneDialog}
        onClose={() => setOpenDropzoneDialog(false)}
        onSave={() => setOpenDropzoneDialog(false)}
        showPreviews={true}
        showFileNamesInPreview={true}
        maxFiles={4}
        multiple={true}
        showAlerts={false}
      />
      <br />
      <div style={{ textAlign: "center" }}>
        <Button
          color="primary"
          style={{ width: "100%" }}
          variant="contained"
          onClick={handleSaveForm}
        >
          {strings.send}
        </Button>
      </div>
    </Paper>
  );
};

export default MOIForm;
