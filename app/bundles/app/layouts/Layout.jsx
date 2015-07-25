import React                    from 'react';
import { PropTypes as Type }    from 'react';

import Topbar                   from '../components/Topbar/TopbarContainer';
import Header                   from '../components/Header/HeaderContainer';
import Footer                   from '../components/Footer/Footer';


export default class Layout extends React.Component {


  static propTypes = {
    children : Type.object,
    authAgent: Type.object,
    location : Type.object
  }


  constructor(props, context) {
    super(props, context);
  }


  render() {

    return (
        <section id="layout">
          <Topbar authAgent={this.props.authAgent} />
          <Header location={this.props.location}/>
          {this.props.children}
          <Footer />
        </section>
    );

  }


}
