import React                  from 'react';
import { PropTypes as Type }  from 'react';

import animate                from 'app/libs/animate';

import Form                   from './_Form';
import Comment                from './_Comment';

import * as actionTypes       from '../../constants/CommentsConstants';


export default class CommentsList extends React.Component {


  static propTypes = {

    comments: Type.shape({
      type        : Type.string,
      comments    : Type.arrayOf(Type.shape({ id: Type.number.isRequired })).isRequired,
      destroyed   : Type.number,
      isDestroying: Type.bool
    }).isRequired,

    commentsActions: Type.shape({
      destroyComment         : Type.func.isRequired,
      destroyCommentFromStore: Type.func.isRequired
    }).isRequired,

    auth: Type.shape({
      isLoggedIn: Type.bool.isRequired
    }).isRequired,

    authAgent: Type.shape({
      getAuthHeaders: Type.func.isRequired
    }),

    loader  : Type.object,
    setTitle: Type.func

  }


  constructor(props, context) {
    super(props, context);
  }


  componentDidMount() {

    this.props.loader.done();
    this.props.setTitle();

  }


  componentWillReceiveProps(newProps) {

    const { type, destroyed } = newProps.comments;

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

    const { comments } = this.props.comments;
    const { isLoggedIn } = this.props.auth;

    const commentsList = comments.map(comment => (
      <li key={comment.id} id={`comments__list__comment-${comment.id}`} className="comments__comment">
        <Comment comment={comment} />
        {isLoggedIn && <div className="destroy" onClick={this._handleDestroy.bind(this, comment.id)} />}
        {/* It's fast, don't need loader */}
        {/* isDestroying && destroyed === comment.id && <div className="loader-wrapper"><Loader /></div> */}
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
