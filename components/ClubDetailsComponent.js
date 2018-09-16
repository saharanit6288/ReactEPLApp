import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { List, ListItem, Card, Icon } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/Entypo';
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
            <View style={styles.viewIconText}>
                <Icon name='user' type='entypo' color='red' />
                <Text  style={styles.text}>
                    {`Manager: ${this.state.clubInfo.manager} (${this.state.clubInfo.manager_nationality})`}
                </Text>
            </View>
            <View style={styles.viewIconText}>
                <Icon name='location' type='entypo' color='red' />
                <Text  style={styles.text}>
                    {`Stadium: ${this.state.clubInfo.stadium} (${this.state.clubInfo.capacity} capacity)`}
                </Text>
            </View>
        </Card>
        <Card title='Next Match'>
            <View style={styles.viewIconText}>
                <Icon name='soccer-ball-o' type='font-awesome' color='red' />
                <Text style={styles.text}>{this.state.clubInfo.next_fixture}</Text>
            </View>
        </Card>
        <Card title='Previous Fixtures'>
                {
                    this.state.clubInfo.previous_fixtures.map((prevFIxtr,i)=> {
                        const reslt = this.state.clubInfo.results[i];
                        return (
                            <View style={styles.viewIconText} key={i}>
                                <Icon name='soccer-ball-o' type='font-awesome' color='red' />
                                <Text style={styles.text}>{`${prevFIxtr} ${reslt}`}</Text>
                            </View>
                        )
                    })
                }
        </Card>
        <Card title='Form'>
            <View>
                <Text h3>{`Form: ${this.state.clubInfo.form}`}</Text>
            </View>
        </Card>
        <Text style={{padding: 10, fontStyle: 'italic'}}>**Sources: https://github.com/drraq/PremierLeague.json</Text>
      </ScrollView>
      );
    }
  }

  const styles = StyleSheet.create({
    
    main: {
        flex: 1   
    },
    viewIconText: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
    text: {
       paddingLeft: 3 
    }
  })