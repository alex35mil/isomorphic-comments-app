import React              from 'react';
import { PropTypes }      from 'react';
import { Link }           from 'react-router';

import CommentsList       from './_CommentsList';
import CommentItem        from './_CommentItem';
import Loader             from 'app/libs/components/Loader/Loader';

import * as actionTypes   from '../../constants/CommentsConstants';


export default class Comments extends React.Component {


  constructor(props, context) {
    super(props, context);
  }


  render() {

    const Component = this.props.params.id ? CommentItem : CommentsList;
    const { isLoading } = this.props.comments;

    return (
        <section id="comments">
          {isLoading ? <Loader /> : <Component {...this.props} />}
        </section>
    );

  }


}
