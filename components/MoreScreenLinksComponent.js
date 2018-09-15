import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header , List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons';

const list = [
    {
      title: 'Players',
      icon: 'user',
      type: 'entypo',
      navigte: 'Player'
    },
    {
      title: 'Clubs',
      icon: 'sports-club',
      type: 'entypo',
      navigte: 'Club'
    }
    ,
    {
      title: 'Stadiums',
      icon: 'location',
      type: 'entypo',
      navigte: 'Stadium'
    },
    {
      title: 'About',
      icon: 'info',
      type: 'entypo',
      navigte: 'About'
    }
  ]

const title = 'More Info';

export default class MoreScreenLinksComponent extends React.Component {
  constructor(props){
    super(props);
  }
  
    render() {
      return (
        <View>
            
            {
                list.map((item, i) => (
                <ListItem
                    key={i}
                    title={item.title}
                    leftIcon={
                      {name: item.icon, type: item.type, style: { color: 'red' }}
                    }
                    onPress={() => this.props.navigation.navigate(item.navigte)}
                />
                ))
            }
        </View>
        
      );
    }
  }
