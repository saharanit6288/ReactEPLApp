import React from 'react';
import EPLFixtureComponent from '../components/EPLFixtureComponent';

export default class FixtureScreen extends React.Component {
  constructor(props){
    super(props);
  }

    render() {
      return (
        <EPLFixtureComponent navigation={this.props.navigation} />
      );
    }
  }