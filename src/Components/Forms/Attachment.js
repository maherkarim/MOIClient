import React from "react";
import strings from "../Localizations/Localizations";
import { DropzoneDialog } from "material-ui-dropzone";
import Fab from "@material-ui/core/Fab";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const Attachment = () => {
  const [fileObjects, setFileObjects] = React.useState([]);
  const [openDropzoneDialog, setOpenDropzoneDialog] = React.useState(false);
  return (
    <>
      <Fab
        color="secondary"
        aria-label="attachments"
        onClick={() => setOpenDropzoneDialog(true)}
      >
        <AttachFileIcon />
      </Fab>
      <br />
      <DropzoneDialog
        dialogTitle={strings.attachments}
        dropzoneText={strings.dropzoneText}
        acceptedFiles={["image/*"]}
        cancelButtonText={strings.back}
        submitButtonText={strings.done}
        previewText={strings.attachedimages}
        onAdd={(newFileObjs) =>
          setFileObjects([].concat(fileObjects, newFileObjs))
        }
        onDelete={(deleteFileObj) => {
          setFileObjects(fileObjects.filter((f) => f !== deleteFileObj));
        }}
        maxFileSize={5000000}
        open={openDropzoneDialog}
        onClose={() => setOpenDropzoneDialog(false)}
        onSave={() => setOpenDropzoneDialog(false)}
        showPreviews={true}
        showFileNamesInPreview={true}
        maxFiles={4}
        multiple={true}
        showAlerts={false}
        fileObjects={fileObjects}
      />
    </>
  );
};

export default Attachment;
