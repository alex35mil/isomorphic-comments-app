import React          from 'react';
import { PropTypes }  from 'react';

import Header         from '../components/Header/Header';
import Footer         from '../components/Footer/Footer';


export default class Layout extends React.Component {


  constructor(props, context) {
    super(props, context);
  }


  render() {

    return (
        <section id="layout">
          <Header />
          {this.props.children}
          <Footer />
        </section>
    );

  }


}
