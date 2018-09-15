import React from 'react';
import MoreScreenLinksComponent from '../components/MoreScreenLinksComponent';

export default class MoreScreen extends React.Component {
  constructor(props){
    super(props);
  }
  
    render() {
      return (
        <MoreScreenLinksComponent  navigation={this.props.navigation} />
      );
    }
  }
