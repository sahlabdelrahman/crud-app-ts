/** @format */

import { useState, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Slide,
  Alert,
  Snackbar,
} from "@mui/material";

import { TransitionProps } from "@mui/material/transitions";

import * as actionCreators from "../../store/action-creators/index";
import { Action } from "../../store/actions";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import styles from "./Post.module.css";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DeletePost({ id }: { id: number }) {
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const dispatch = useDispatch<Dispatch<Action>>();
  const { deletePost } = bindActionCreators(actionCreators, dispatch);

  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    handleClose();
    await deletePost(`${id}`);
    handleClickSnackbar();
  };

  return (
    <div>
      <DeleteOutlinedIcon
        onClick={handleClickOpen}
        color="error"
        className={styles.icon}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete the post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>
      {openSnackbar && <h1>Hello worlds</h1>}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Post is deleted
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DeletePost;
