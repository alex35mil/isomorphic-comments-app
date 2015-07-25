import React                    from 'react';
import { PropTypes as Type }    from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';

import Topbar                   from './Topbar';

import * as AuthActions         from '../../actions/AuthActions';


@connect(state => ({
  auth: state.auth
}))

export default class TopbarContainer extends React.Component {


  static propTypes = {
    auth    : Type.object.isRequired,
    dispatch: Type.func.isRequired
  }


  constructor(props, context) {
    super(props, context);
  }


  render() {

    const { auth, dispatch } = this.props;

    return (
      <Topbar
          auth={auth}
          authActions={bindActionCreators(AuthActions, dispatch)}
          {...this.props}
      />
    );

  }

}
