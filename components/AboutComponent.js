import React from 'react';  
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

export default class AboutComponent extends React.Component {
  constructor(props){
    super(props);
  }

    render() {
      return (
        <Card>
            <Text>Developed By: Ranit Saha</Text>
            <Text>Contact No: +919830477835</Text>
            <Text>Email Id: saharanit321@gmail.com</Text>
            <Text>Location: Kolkata, West Bengal, India</Text>
            <Text>News API Source: https://newsapi.org/</Text>
            <Text>EPL API Source: https://github.com/drraq/PremierLeague.json</Text>
        </Card>
      );
    }
  }