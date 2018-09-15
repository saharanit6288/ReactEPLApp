import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { List, ListItem, Card } from 'react-native-elements';
import globalVar from '../config';


export default class PlayerListComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            playerList: []
        };
      }

    componentDidMount() {
        this.fetchEPLPlayers();
    }

    fetchEPLPlayers() {
        let urlPath = globalVar.EPLFixtureJson;

        fetch(urlPath)
        .then((response) => response.json())
        .then((responseJson) => {
            //alert(JSON.stringify(responseJson.articles));
            this.setState({
                isLoading: false,
                playerList: responseJson.players,
            }, function(){

            });

        })
        .catch((error) =>{
            console.error(error);
        });

    }
    
    
    render() {
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 50}}>
                <ActivityIndicator/>
              </View>
            )
          }


      return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <List>
        {
          this.state.playerList.map((item, i) => (
            <ListItem
              key={i}
              title={`${item.first_name} ${item.last_name}`}
              subtitle={item.current_club}
              leftIcon={{name: 'user', type: 'entypo', style: { color: 'red' }}}
              onPress={() => {
                this.props.navigation.navigate('PlayerDetails', {
                  player: `${JSON.stringify(item)}`,
                });
              }}
            />
          ))
        }
      </List>
      </ScrollView>
      );
    }
  }

  const styles = StyleSheet.create({
    
    main: {
        flex: 1   
    }
  })