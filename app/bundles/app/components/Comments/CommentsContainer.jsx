import React                    from 'react';
import { PropTypes as Type }    from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';

import Comments                 from './Comments';

import fetchData                from '../../decorators/fetchData';

import * as AuthActions         from '../../actions/AuthActions';
import * as CommentsActions     from '../../actions/CommentsActions';


@fetchData(({ apiHost, auth, dispatch, params }) => {
  return dispatch(CommentsActions.loadComments({ apiHost }));
})

@connect(state => ({
  auth    : state.auth,
  comments: state.comments
}))

export default class CommentsContainer extends React.Component {


  static propTypes = {
    auth    : Type.object.isRequired,
    comments: Type.object.isRequired,
    dispatch: Type.func.isRequired
  }


  constructor(props, context) {
    super(props, context);
  }


  render() {

    const { auth, comments, dispatch } = this.props;

    return (
      <Comments
          auth={auth}
          authActions={bindActionCreators(AuthActions, dispatch)}
          comments={comments}
          commentsActions={bindActionCreators(CommentsActions, dispatch)}
          {...this.props}
      />
    );

  }

}
