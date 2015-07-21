import React          from 'react';
import { PropTypes }  from 'react';
import { Link }       from 'react-router';

import Comment        from './_Comment';


export default class CommentItem extends React.Component {


  constructor(props, context) {
    super(props, context);
  }


  componentDidMount() {

    this.props.loader.done();
    this.props.setTitle();

  }


  componentWillReceiveProps(newProps) {

    newProps.loader.done();

  }


  render() {

    const { commentsActions } = this.props;
    const { comments } = this.props.comments;

    const comment = comments.find(_comment => (
      _comment.id === parseInt(this.props.params.id, 10)
    ));

    return (
      <div>
        <div id="comments__comment" className="comments__comment">
          <Comment comment={comment} />
        </div>
        <Link to="/" id="comments__comment__link-back" className="button">
          &larr; Back to comments
        </Link>
      </div>
    );

  }


}
