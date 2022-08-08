/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Snackbar,
} from "@mui/material";

import * as actionCreators from "../../store/action-creators/index";
import { Action } from "../../store/actions";
import { State } from "../../store/reducer";

import HeaderOfPosts from "./HeaderOfPosts";
import AddPost from "../Post/AddPost";
import Post from "../Post";
import Pagination from "./Pagination";

import styles from "./Posts.module.css";

function PostsComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const { posts, loading, currentPosts, error } = useSelector(
    (state: State) => state.posts
  );

  const dispatch = useDispatch<Dispatch<Action>>();
  const { getPosts, searchPost } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const handleRequest = async () => {
      await getPosts();
      searchPost("");
    };
    handleRequest();
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const filteredOnCurrentPosts = currentPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (number: number) => setCurrentPage(number);

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
    <div className={styles.postsContainer}>
      <Container>
        <AddPost />
        <TableContainer className={styles.tableContainer} component={Paper}>
          <HeaderOfPosts
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            postsLength={currentPosts.length}
          />
          <Table
            className={styles.table}
            sx={{ minWidth: 700 }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <TableCell className={styles.cell}>Title</TableCell>
                <TableCell className={styles.cell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <tr>
                  <td>
                    <p className={styles.text}>Loading...</p>
                  </td>
                </tr>
              ) : filteredOnCurrentPosts.length > 0 ? (
                filteredOnCurrentPosts?.map((post) => (
                  <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    body={post.body}
                  />
                ))
              ) : (
                <tr>
                  <td>
                    <p className={styles.text}>No posts to show</p>
                  </td>
                </tr>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {currentPosts.length > 10 && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={currentPosts.length}
            paginate={paginate}
          />
        )}
      </Container>
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            This is an error message! - {error}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default PostsComponent;
