import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { List, ListItem, Card } from 'react-native-elements';
import globalVar from '../config';


export default class ClubListComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            clubList: []
        };
      }

    componentDidMount() {
        this.fetchEPLClubs();
    }

    fetchEPLClubs() {
        let urlPath = globalVar.EPLFixtureJson;

        fetch(urlPath)
        .then((response) => response.json())
        .then((responseJson) => {
            //alert(JSON.stringify(responseJson.articles));
            this.setState({
                isLoading: false,
                clubList: responseJson.clubs,
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
          this.state.clubList.map((item, i) => (
            <TouchableOpacity key={i}
            onPress={() => {
              this.props.navigation.navigate('ClubDetails', {
                id: item.id
                //club: `${JSON.stringify(item)}`,
              });
            }}>
              <ListItem
                title={item.name}
                subtitle={item.stadium}
                leftIcon={{name: 'sports-club', type: 'entypo', style: { color: 'red' }}}
              />
            </TouchableOpacity>
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