import React from 'react';
import ClubListComponent from '../components/ClubListComponent';

export default class ClubScreen extends React.Component {
  constructor(props){
    super(props);
  }

    render() {
      return (
        <ClubListComponent  navigation={this.props.navigation} />
      );
    }
  }
