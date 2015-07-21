/* eslint no-shadow: 0 */

import * as actionTypes  from '../constants/CommentsConstants';


const initialState = {
  type        : null,
  comments    : [],
  destroyed   : null,
  errors      : null,
  isLoading   : false,
  isPosting   : false,
  isDestroying: false
};

export default function comments(state = initialState, action) {

  const { type, comments, comment, errors } = action;

  switch (type) {

    case actionTypes.COMMENTS_LOAD_REQUESTED:
      return {
        ...state,
        type,
        comments : [],
        isLoading: true
      };

    case actionTypes.COMMENTS_LOAD_SUCCEED:
      return {
        ...state,
        type,
        comments,
        errors   : null,
        isLoading: false
      };

    case actionTypes.COMMENTS_LOAD_FAILED:
      return {
        ...state,
        type,
        errors,
        comments : [],
        isLoading: false
      };



    case actionTypes.COMMENT_ADD_REQUESTED:
      return {
        ...state,
        type,
        isPosting: true
      };

    case actionTypes.COMMENT_ADD_SUCCEED:

      let withNewComment = state.comments.slice();
      withNewComment.unshift(comment);

      return {
        ...state,
        type,
        comments : withNewComment,
        isPosting: false
      };

    case actionTypes.COMMENT_ADD_FAILED:
      return {
        ...state,
        type,
        errors,
        isPosting: false
      };



    case actionTypes.COMMENT_DESTROY_REQUESTED:
      return {
        ...state,
        type,
        destroyed   : comment,
        isDestroying: true
      };

    case actionTypes.COMMENT_DESTROY_SUCCEED:
      return {
        ...state,
        type,
        destroyed   : comment,
        isDestroying: false
      };

    case actionTypes.COMMENT_DESTROY_DO:

      const withoutComment = state.comments.filter(_comment => _comment.id !== comment);

      return {
        ...state,
        type,
        comments    : withoutComment,
        destroyed   : null,
        isDestroying: false
      };

    case actionTypes.COMMENT_DESTROY_FAILED:
      return {
        ...state,
        type,
        errors,
        destroyed   : null,
        isDestroying: false
      };



    default:
      return state;

  }

}
