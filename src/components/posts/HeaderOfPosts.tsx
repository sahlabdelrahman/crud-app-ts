/** @format */

import { useDispatch } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Typography } from "@mui/material";

import * as actionCreators from "../../store/action-creators/index";
import { Action } from "../../store/actions";
import styles from "./Posts.module.css";

function HeaderOfPosts({
  searchTerm,
  setSearchTerm,
  postsLength,
}: {
  searchTerm: string;
  setSearchTerm: any;
  postsLength: number;
}) {
  const dispatch = useDispatch<Dispatch<Action>>();
  const { searchPost } = bindActionCreators(actionCreators, dispatch);

  const handleSearch = (e: {
    target: {
      value: string;
    };
  }) => {
    setSearchTerm(e.target.value);
    searchPost(e.target.value);
  };

  return (
    <div className={styles.headerOfPosts}>
      <div>
        <Typography>{`${postsLength} `} posts</Typography>
      </div>
      <div>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className={styles.input}
        />
      </div>
    </div>
  );
}

export default HeaderOfPosts;
