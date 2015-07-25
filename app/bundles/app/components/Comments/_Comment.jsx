import React                  from 'react';
import { PropTypes as Type }  from 'react';
import { Link }               from 'react-router';


export default class Comment extends React.Component {


  static propTypes = {
    comment: Type.shape({
      id     : Type.number.isRequired,
      author : Type.string.isRequired,
      comment: Type.string.isRequired
    }).isRequired
  }


  constructor(props, context) {
    super(props, context);
  }


  render() {

    const { comment } = this.props;

    return (
        <div>
          <div className="comments__comment__author">
            <Link to={`/comments/${comment.id}`}>
              <strong>{comment.author}</strong> said:
            </Link>
          </div>
          <div className="comments__comment__text">
            {comment.comment}
          </div>
        </div>
    );

  }


}
