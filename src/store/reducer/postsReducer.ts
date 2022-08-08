/** @format */

import ActionTypes from "../action-types";
import { Action, IState } from "../actions";

const initialState = {
  loading: false,
  error: "",
  posts: [],
  currentPosts: [],
  post: {
    userId: 0,
    id: 0,
    title: "",
    body: "",
  },
};

const postsReducer = (state: IState = initialState, action: Action): IState => {
  switch (action.type) {
    case ActionTypes.POSTS_LOADING:
      return { ...state, loading: true };
    case ActionTypes.POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        currentPosts: action.payload,
      };
    case ActionTypes.POST_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case ActionTypes.ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, { ...action.payload }],
        currentPosts: [...state.posts, { ...action.payload }],
      };
    case ActionTypes.SEARCH_POST:
      return {
        ...state,
        loading: false,
        currentPosts:
          action.payload === "" || action.payload.length <= 1
            ? state.posts
            : state.posts.filter((post) =>
                post.title
                  .toLocaleLowerCase()
                  .includes(action.payload.toLocaleLowerCase())
              ),
      };
    case ActionTypes.POSTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default postsReducer;
