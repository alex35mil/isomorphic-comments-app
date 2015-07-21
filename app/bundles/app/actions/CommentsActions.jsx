import apiCall            from 'app/libs/apiCall';

import * as actionTypes   from '../constants/CommentsConstants';


export function loadComments({ apiHost }) {

  return dispatch => {

    dispatch({
      type: actionTypes.COMMENTS_LOAD_REQUESTED
    });

    return apiCall({
      method: 'GET',
      path  : '/comments',
      host  : apiHost
    })
      .then(res => {
        dispatch({
          type    : actionTypes.COMMENTS_LOAD_SUCCEED,
          comments: res.data.comments
        });
      })
      .catch(res => {
        dispatch({
          type  : actionTypes.COMMENTS_LOAD_FAILED,
          errors: {
            code: res.status,
            data: res.data
          }
        });
      });

  };

}


export function addComment({ data }) {

  return dispatch => {

    dispatch({
      type: actionTypes.COMMENT_ADD_REQUESTED
    });

    return apiCall({
      method: 'POST',
      path  : '/comments',
      data  : data
    })
      .then(res => {
        dispatch({
          type   : actionTypes.COMMENT_ADD_SUCCEED,
          comment: res.data.comment
        });
      })
      .catch(res => {
        dispatch({
          type  : actionTypes.COMMENT_ADD_FAILED,
          errors: {
            code: res.status,
            data: res.data
          }
        });
      });

  };

}

export function destroyComment({ comment, auth }) {

  return dispatch => {

    dispatch({
      type   : actionTypes.COMMENT_DESTROY_REQUESTED,
      comment: comment
    });

    return apiCall({
      method: 'DELETE',
      path  : `/comments/${comment}`,
      auth  : auth
    })
      .then(res => {
        dispatch({
          type   : actionTypes.COMMENT_DESTROY_SUCCEED,
          comment: comment
        });
      })
      .catch(res => {
        dispatch({
          type  : actionTypes.COMMENT_DESTROY_FAILED,
          errors: {
            code: res.status,
            data: res.data
          }
        });
      });

  };

}


export function destroyCommentFromStore(comment) {

  return {
    type   : actionTypes.COMMENT_DESTROY_DO,
    comment: comment
  };

}
