import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { List, ListItem, Card } from 'react-native-elements';
import globalVar from '../config';



export default class ClubDetailsComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            clubInfo: {},
            clubId: this.props.navigation.getParam('id','no id'),
        };
      }


    componentDidMount() {
        this.fetchEPLClubInfo(this.state.clubId);
    }

    fetchEPLClubInfo(id) {
        let urlPath = globalVar.EPLFixtureJson;

        fetch(urlPath)
        .then((response) => response.json())
        .then((responseJson) => {
            let clubInfo = responseJson.clubs.find((e) => e.id === id);
            //alert(JSON.stringify(clubInfo));
            this.setState({
                isLoading: false,
                clubInfo,
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
        <Card title={this.state.clubInfo.name}>
            <View>
                <Text h3>{`Manager: ${this.state.clubInfo.manager} (${this.state.clubInfo.manager_nationality})`}</Text>
            </View>
            <View>
                <Text h3>{`Stadium: ${this.state.clubInfo.stadium} (${this.state.clubInfo.capacity} capacity)`}</Text>
            </View>
            <View>
                <Text h3>{`Next Game: ${this.state.clubInfo.next_fixture}`}</Text>
            </View>
            <View>
                <Text h3>Previous Games:</Text>
                {
                    this.state.clubInfo.previous_fixtures.map((prevFIxtr,i)=> {
                        const reslt = this.state.clubInfo.results[i];
                        return (
                            <Text key={i}>{`${prevFIxtr} ${reslt}`}</Text>
                        )
                    })
                }
            </View>
            <View>
                <Text h3>{`Form: ${this.state.clubInfo.form}`}</Text>
                
            </View>
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