import React from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';

class Home extends React.Component {
  render() {
    return (
      <div className="page page--home">
        <Helmet title="Home"/>
        <h1 className="v2-title v2-title--1">Home</h1>
      </div>
    );
  }
}

export default connect()(Home);
