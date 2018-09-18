import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Linking, TouchableOpacity, FlatList, SearchBar } from 'react-native';
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
    
    _keyExtractor = (item, index) => item.id.toString();

    // renderHeader = () => {
    //   return <SearchBar placeholder="Type Here..." lightTheme round />;
    // };

    renderFooter = () => {
      if (!this.state.isLoading) return null;
  
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: "#CED0CE"
          }}
        >
          <ActivityIndicator animating size="large" />
        </View>
      );
  };

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
        <List>
            <FlatList
              data={this.state.playerList}
              keyExtractor={this._keyExtractor}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              renderItem={({ item }) => (
                <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('PlayerDetails', {
                    player: item,
                  });
                }}>
                  <ListItem
                    title={`${item.first_name} ${item.last_name}`}
                    subtitle={item.current_club}
                    leftIcon={{name: 'user', type: 'entypo', style: { color: 'red' }}}
                  />
                </TouchableOpacity>
              )}
            />
        </List>
      
      );
    }
  }

  const styles = StyleSheet.create({
    
    main: {
        flex: 1   
    }
  })