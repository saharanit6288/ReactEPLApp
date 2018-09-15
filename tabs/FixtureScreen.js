import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import EPLFixtureComponent from '../components/EPLFixtureComponent';

const title = 'EPL Fixtures';

export default class FixtureScreen extends React.Component {
  constructor(props){
    super(props);
  }
  
    render() {
      return (
        <View>
          <Header
            centerComponent={{ text: title, style: { color: '#fff' } }}
          />
          <EPLFixtureComponent />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
  });