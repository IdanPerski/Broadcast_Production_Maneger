import { bool, func, string } from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteDialog = ({
  isDialogOpen,
  onDelete,
  onChangeDialog,
  dialogText,
  title,
}) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={onChangeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onChangeDialog} color="error">
          cancel
        </Button>
        <Button onClick={onDelete} autoFocus color="info">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  isDialogOpen: bool.isRequired,
  onChangeDialog: func.isRequired,
  onDelete: func.isRequired,
  title: string.isRequired,
};

export default DeleteDialog;
