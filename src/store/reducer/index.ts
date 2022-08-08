/** @format */

import { combineReducers } from "redux";

import postsReducer from "./postsReducer";

const reducers = combineReducers({
  posts: postsReducer,
});

export type State = ReturnType<typeof reducers>;

export default reducers;
