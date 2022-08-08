/** @format */

import { useState, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { useForm } from "react-hook-form";

import validationOpt from "../../globals/formValidation";

import * as actionCreators from "../../store/action-creators/index";
import { Action } from "../../store/actions";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Slide,
  TextField,
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

const AddPost = () => {
  type FormData = {
    title: string;
    description: string;
  };

  const dispatch = useDispatch<Dispatch<Action>>();
  const { addPost } = bindActionCreators(actionCreators, dispatch);

  const { register, handleSubmit, reset, formState } =
    useForm<FormData>(validationOpt);

  const errors: any = formState.errors;

  const onSubmit = (details: { title: string; description: string }) => {
    const data = {
      // userId: 1,
      // id: Math.round(Math.random() * 1000000),
      title: details.title,
      body: details.description,
    };

    addPost(data);
    handleClose();
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset({
      title: "",
      description: "",
    });
  };

  return (
    <div className={styles.addButtonContainer}>
      <Button className={styles.button} onClick={() => handleClickOpen()}>
        Add post
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="dialog-slide"
      >
        <DialogTitle>Add</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add post, you must enter title and description
          </DialogContentText>
          <form id="addForm" onSubmit={handleSubmit(onSubmit)}>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="addForm">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddPost;
