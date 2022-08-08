/** @format */

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dispatch, bindActionCreators } from "redux";

import * as actionCreators from "../../store/action-creators/index";
import { State } from "../../store/reducer";
import { Action } from "../../store/actions";

import MainLayout from "../../layouts/MainLayout";
import { Container } from "@mui/system";
import { Paper, Alert, Snackbar } from "@mui/material";

import styles from "./Post.module.css";

const Post = () => {
  const { post, loading, error } = useSelector((state: State) => state.posts);
  const params = useParams();
  const id = params.id || "";

  const dispatch = useDispatch<Dispatch<Action>>();
  const { getPost } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    getPost(id);
    window.scrollTo(0, 0);
  }, [id]);

  const [open, setOpen] = useState(true);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <MainLayout>
      <main className={styles.main}>
        <Container className={styles.container} component={Paper}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <h2>{post?.title}</h2>
              <p>{post?.body}</p>
            </div>
          )}
        </Container>
        {error && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              This is an error message! - {error}
            </Alert>
          </Snackbar>
        )}
      </main>
    </MainLayout>
  );
};

export default Post;
