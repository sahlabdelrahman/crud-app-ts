/** @format */

import { useState, forwardRef } from "react";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import styles from "./Post.module.css";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ViewPost({
  id,
  title,
  body,
}: {
  id: number;
  title: string;
  body: string;
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <VisibilityOutlinedIcon
        onClick={handleClickOpen}
        color="primary"
        className={styles.icon}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="dialog-slide"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ViewPost;
