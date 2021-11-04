import * as React from "react";
import Dialog from "@mui/material/Dialog";

export default function FormDialog(props) {
  const { open } = props;
  return (
    <div>
      <Dialog open={open}>{props.children}</Dialog>
    </div>
  );
}
