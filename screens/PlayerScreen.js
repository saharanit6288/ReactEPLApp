import React from 'react';
import PlayerListComponent from '../components/PlayerListComponent';

export default class PlayerScreen extends React.Component {
  constructor(props){
    super(props);
  }

    render() {
      return (
        <PlayerListComponent  navigation={this.props.navigation} />
      );
    }
  }
