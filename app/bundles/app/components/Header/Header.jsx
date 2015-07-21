import React          from 'react';
import { PropTypes }  from 'react';
import { Link }       from 'react-router';


export default class Header extends React.Component {


  constructor(props, context) {
    super(props, context);
  }


  _loadComments() {

    const { commentsActions, location } = this.props;

    if (location.pathname !== '/login') {
      commentsActions.loadComments({});
    }

  }


  render() {

    return (
        <header>
          <h1>
            <Link to="/" onClick={::this._loadComments}>
              Isomorphic Comments
            </Link>
          </h1>
        </header>
    );

  }


}
