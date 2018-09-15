import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { List, ListItem, Card } from 'react-native-elements';
import globalVar from '../config';


export default class PlayerDetailsComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            // id = this.props.navigation.getParam('id', 'No Record Found'),
            // player: {}
        };
      }

//     componentDidMount() {
//         this.fetchEPLPlayerInfo(id);
//     }

//     fetchEPLPlayerInfo(id) {
//         let urlPath = globalVar.EPLFixtureJson;

//         fetch(urlPath)
//         .then((response) => response.json())
//         .then((responseJson) => {
//             //alert(JSON.stringify(responseJson.articles));
//             this.setState({
//                 isLoading: false,
//                 player: responseJson.players.find(id),
//             }, function(){

//             });

//         })
//         .catch((error) =>{
//             console.error(error);
//         });

//     }
    
    
    render() {
        const { navigation } = this.props;
        const player = navigation.getParam('player', 'No Data Found');


        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 50}}>
                <ActivityIndicator/>
              </View>
            )
          }


      return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Card title={`${player.first_name} ${player.last_name}`}>
            <Text h3>{`Club: ${player.current_club}`}</Text>
        </Card>
      </ScrollView>
      );
    }
  }

  const styles = StyleSheet.create({
    
    main: {
        flex: 1   
    }
  })