import React              from 'react';
import { PropTypes }      from 'react';
import { Link }           from 'react-router';


export default class Topbar extends React.Component {


  static contextTypes = {
    router: PropTypes.object
  }


  constructor(props, context) {
    super(props, context);
  }


  _handleLogout() {

    const { authActions, authAgent } = this.props;
    const { router } = this.context;
    const { pathname, query } = router.state.location;

    const backPath = router.makePath(pathname, query);

    authActions.logout({ authAgent, router, backPath });

  }


  render() {

    const { isLoggedIn } = this.props.auth;
    const loginLink  = (
      <span id="topbar__auth-link__login__wrapper">
        <Link to="/login" id="topbar__auth-link__login">Login</Link>
      </span>
    );
    const logoutLink = (
      <span id="topbar__auth-link__logout__wrapper">
        <span id="topbar__auth-link__logout" onClick={::this._handleLogout}>Logout</span>
      </span>
    );

    return (
        <section id="topbar">
          <div id="topbar__links-wrapper">
            <div id="topbar__githab-link" className="float-left">
              <a href="https://github.com/alexfedoseev/isomorphic-comments-app" target="_blank">Sources on Github</a>
            </div>
            <div id="topbar__auth-link" className="float-right">
              {isLoggedIn ? logoutLink : loginLink}
            </div>
          </div>
        </section>
    );

  }


}
