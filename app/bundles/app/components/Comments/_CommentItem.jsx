import React                  from 'react';
import { PropTypes as Type }  from 'react';
import { Link }               from 'react-router';

import Comment                from './_Comment';


export default class CommentItem extends React.Component {


  static propTypes = {

    comments: Type.shape({
      comments: Type.arrayOf(Type.shape({
        id: Type.number.isRequired
      })).isRequired
    }).isRequired,

    params: Type.shape({
      id: Type.string.isRequired
    }).isRequired,

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

    newProps.loader.done();

  }


  render() {

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
