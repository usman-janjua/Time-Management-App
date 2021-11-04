import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmationDialog(props) {
  const { open, handleClose, handleSubmit, heading } = props;
  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>{heading}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Yes
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
