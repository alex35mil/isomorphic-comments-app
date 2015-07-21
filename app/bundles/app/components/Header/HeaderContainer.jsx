import React                    from 'react';
import { PropTypes }            from 'react';
import { bindActionCreators }   from 'redux';

import Header                   from './Header';

import * as CommentsActions     from '../../actions/CommentsActions';


export default class HeaderContainer extends React.Component {


  static contextTypes = {
    store: PropTypes.object
  }


  constructor(props, context) {
    super(props, context);
  }


  render() {

    const { dispatch } = this.context.store;

    return (
      <Header
          commentsActions={bindActionCreators(CommentsActions, dispatch)}
          {...this.props}
      />
    );

  }

}
