import React              from 'react';
import { PropTypes }      from 'react';
import { Link }           from 'react-router';

import animate            from 'app/libs/animate';
import Loader             from 'app/libs/components/Loader/Loader';

import Form               from './_Form';
import Comment            from './_Comment';

import * as actionTypes   from '../../constants/CommentsConstants';


export default class CommentsList extends React.Component {


  constructor(props, context) {
    super(props, context);
  }


  componentDidMount() {

    this.props.loader.done();
    this.props.setTitle();

  }


  componentWillReceiveProps(newProps) {

    const { comments } = this.props.comments;
    const { type, destroyed, comments: newComments } = newProps.comments;

    if (type === actionTypes.COMMENT_DESTROY_SUCCEED && destroyed) {
      animate(`comments__list__comment-${destroyed}`, 'flipOutX', () => {
        newProps.commentsActions.destroyCommentFromStore(destroyed);
      });
    } else {
      newProps.loader.done();
    }

  }


  componentDidUpdate() {

    const { type, comments } = this.props.comments;

    if (type === actionTypes.COMMENT_ADD_SUCCEED) {
      const newComment = comments[0];
      animate(`comments__list__comment-${newComment.id}`, 'flipInX');
    }

  }


  _handleDestroy(comment) {

    const { commentsActions, authAgent } = this.props;
    commentsActions.destroyComment({
      comment: comment,
      auth   : authAgent.getAuthHeaders()
    });

  }


  render() {

    const { comments, isDestroying, destroyed } = this.props.comments;
    const { isLoggedIn } = this.props.auth;
    console.log(destroyed);

    const commentsList = comments.map(comment => (
      <li key={comment.id} id={`comments__list__comment-${comment.id}`} className="comments__comment">
        <Comment comment={comment} />
        { isLoggedIn && <div className="destroy" onClick={this._handleDestroy.bind(this, comment.id)} /> }
        { isDestroying && destroyed === comment.id && <div className="loader-wrapper"><Loader /></div> }
      </li>
    ));

    return (
        <div>
          <Form {...this.props} />
          <ul id="comments__list">
            {commentsList}
          </ul>
        </div>
    );

  }


}
