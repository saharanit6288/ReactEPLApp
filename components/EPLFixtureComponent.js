import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { List, ListItem, Card, Icon } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/Entypo';
import globalVar from '../config';

export default class EPLFixtureComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            fixtureList: []
        };
      }

    componentDidMount() {
        this.fetchEPLFixtures();
    }

    fetchEPLFixtures() {
        let urlPath = globalVar.EPLFixtureJson;

        fetch(urlPath)
        .then((response) => response.json())
        .then((responseJson) => {
            //alert(JSON.stringify(responseJson.articles));
            this.setState({
                isLoading: false,
                fixtureList: responseJson.season_fixtures,
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
        {
            this.state.fixtureList.map((fxtr, i) => (
                <Card
                    title={`Match Week ${fxtr.matchday}`}
                    key={i}>
                        {
                        fxtr.fixtures.map((item, j) => (
                            <TouchableOpacity key={j}
                                onPress={() => {
                                this.props.navigation.navigate('MatchDetails', {
                                    match: item
                                });
                                }}>
                                <ListItem
                                    title={
                                        <View style={styles.viewIconTextFlexJustifyCenter}>
                                            <Icon name='sports-club' type='entypo' color='red' />
                                            <Text  style={styles.text}>
                                                {item.home_team_code} 
                                            </Text>
                                            <Text style={styles.text}>
                                                {item.status === 'FT' ? item.full_time_score !==null ? item.full_time_score : '-' : item.half_time_score !== null ? item.half_time_score : '-'}
                                            </Text>
                                            <Text style={styles.text}>
                                                {item.away_team_code}
                                            </Text>
                                            <Icon name='sports-club' type='entypo' color='red' />
                                        </View>
                                    }
                                    subtitle={
                                        <View style={styles.viewIconTextFlexJustifyStart}>
                                            <Icon name='calendar' type='entypo' color='red' />
                                            <Text style={styles.text}>{item.date}</Text>
                                            <Icon name='location' type='entypo' color='red' />
                                            <Text style={styles.text}>{item.venue}</Text>
                                        </View>
                                    }
                                />
                            </TouchableOpacity>
                        ))
                        }
                </Card>
            ))
        }
        </ScrollView>
      );
    }
  }

  const styles = StyleSheet.create({
    
    main: {
        flex: 1   
    },
    viewIconTextFlexJustifyStart: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
      viewIconTextFlexJustifyCenter: {
          padding: 10,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        },
    text: {
       paddingLeft: 5,
       paddingRight: 5 
    }
  })
