/** @format */

import ActionTypes from "../action-types";

export interface IState {
  loading: boolean;
  error: string;
  posts: IPost[];
  currentPosts: IPost[];
  post: IPost;
}

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface IPostsSuccess {
  type: ActionTypes.POSTS_SUCCESS;
  payload: IPost[];
}

interface IPostSuccess {
  type: ActionTypes.POST_SUCCESS;
  payload: IPost;
}

interface IAddPost {
  type: ActionTypes.ADD_POST;
  payload: {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
}

interface ISearchPost {
  type: ActionTypes.SEARCH_POST;
  payload: string;
}

interface IPostsFail {
  type: ActionTypes.POSTS_FAIL;
  payload: string;
}

interface IPostsLoading {
  type: ActionTypes.POSTS_LOADING;
}

export type Action =
  | IPostsSuccess
  | IPostsFail
  | IPostsLoading
  | IPostSuccess
  | IAddPost
  | ISearchPost;
