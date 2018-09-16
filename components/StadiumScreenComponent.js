import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { List, ListItem, Card } from 'react-native-elements';
import globalVar from '../config';
import Storage from '../Storage';


export default class StadiumScreenComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            stadiumList: []
        };
      }

    // async componentDidMount () {
    //     let EPLFixtureJson = await Storage.getItem("EPLFixtureResponseJson");
    //     alert(JSON.stringify(EPLFixtureJson));
    //     this.setState({
    //       isLoading: false,
    //       stadiumList: EPLFixtureJson.stadiums 
    //     });

    // }

    componentDidMount() {
        this.fetchEPLStadiums();
    }

    fetchEPLStadiums() {
        let urlPath = globalVar.EPLFixtureJson;

        fetch(urlPath)
        .then((response) => response.json())
        .then((responseJson) => {
            //alert(JSON.stringify(responseJson.articles));
            this.setState({
                isLoading: false,
                stadiumList: responseJson.stadiums,
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
          this.state.stadiumList.map((item, i) => (
            <TouchableOpacity key={i}>
              <ListItem
                title={item}
                leftIcon={{name: 'location', type: 'entypo', style: { color: 'red' }}}
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

