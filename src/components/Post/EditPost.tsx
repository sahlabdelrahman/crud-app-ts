/** @format */

import { useState, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { useForm } from "react-hook-form";

import validationOpt from "../../globals/formValidation";

import * as actionCreators from "../../store/action-creators/index";
import { Action } from "../../store/actions";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import styles from "./Post.module.css";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Slide,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditPost({
  id,
  title,
  body,
}: {
  id: number;
  title: string;
  body: string;
}) {
  type FormData = {
    title: string;
    description: string;
  };

  const dispatch = useDispatch<Dispatch<Action>>();
  const { editPost } = bindActionCreators(actionCreators, dispatch);

  const { register, handleSubmit, formState } = useForm<FormData>({
    ...validationOpt,
    defaultValues: { title: title, description: body },
  });

  const errors: any = formState.errors;

  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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

  let onSubmit = async (details: { title: string; description: string }) => {
    let data = {
      id: id,
      title: details.title,
      body: details.description,
    };

    handleClose();
    await editPost(data);
    handleClickSnackbar();
  };

  return (
    <div>
      <EditOutlinedIcon
        onClick={() => handleClickOpen()}
        color="action"
        className={styles.icon}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="dialog-slide"
      >
        <DialogTitle>Update Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit the post, you must enter the new title and description
          </DialogContentText>
          <form id="editForm">
            <TextField
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              {...register("title")}
            />
            {errors.title?.message && (
              <span className={styles.alert}>{errors.title?.message}</span>
            )}
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              {...register("description")}
            />
            {errors.description?.message && (
              <span className={styles.alert}>
                {errors.description?.message}
              </span>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={handleSubmit(onSubmit)} form="editForm">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{ width: "100%" }}
        >
          Post is Updated
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EditPost;
