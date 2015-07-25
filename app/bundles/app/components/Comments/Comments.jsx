import React                  from 'react';
import { PropTypes as Type }  from 'react';

import Loader                 from 'app/libs/components/Loader/Loader';

import CommentsList           from './_CommentsList';
import CommentItem            from './_CommentItem';


export default class Comments extends React.Component {


  static propTypes = {
    comments: Type.object.isRequired,
    params  : Type.object.isRequired
  }


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
