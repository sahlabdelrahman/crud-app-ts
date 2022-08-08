/** @format */

import { Dispatch } from "redux";
import axios from "axios";

import ActionTypes from "../action-types";
import { Action } from "../actions";

const url = process.env.REACT_APP_API;

const getPosts = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionTypes.POSTS_LOADING,
      });

      const res = await axios.get(`${url}`);

      dispatch({
        type: ActionTypes.POSTS_SUCCESS,
        payload: res.data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.POSTS_FAIL,
        payload: error?.message,
      });
    }
  };
};

const getPost = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionTypes.POSTS_LOADING,
      });

      const res = await axios.get(`${url}/${id}`);

      dispatch({
        type: ActionTypes.POST_SUCCESS,
        payload: res.data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.POSTS_FAIL,
        payload: error?.message,
      });
    }
  };
};

const deletePost = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.delete(`${url}/${id}`);

      if (res.status === 200) {
        dispatch<any>(getPosts());
      }
    } catch (error: any) {
      dispatch({
        type: ActionTypes.POSTS_FAIL,
        payload: error?.message,
      });
    }
  };
};

const editPost = (details: { id: number; title: string; body: string }) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.put(`${url}/${details.id}`, { ...details });

      if (res.status === 200) {
        dispatch<any>(getPosts());
      }
    } catch (error: any) {
      dispatch({
        type: ActionTypes.POSTS_FAIL,
        payload: error?.message,
      });
    }
  };
};

const addPost = (details: { title: string; body: string }) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionTypes.POSTS_LOADING,
      });

      const res = await axios.post(`${url}`, { ...details });

      dispatch({
        type: ActionTypes.ADD_POST,
        payload: {
          ...res.data,
        },
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.POSTS_FAIL,
        payload: error?.message,
      });
    }
  };
};

const searchPost = (value: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: ActionTypes.POSTS_LOADING,
      });

      await dispatch({
        type: ActionTypes.SEARCH_POST,
        payload: value,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.POSTS_FAIL,
        payload: error?.message,
      });
    }
  };
};

export { getPosts, getPost, deletePost, editPost, addPost, searchPost };
