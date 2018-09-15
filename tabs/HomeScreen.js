import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import HomeEPLNewsComponent from '../components/HomeEPLNewsComponent';

const title = 'EPL Top Headlines';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
  }
 
    render() {
      return (
        <View>
          
          <HomeEPLNewsComponent />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
  });