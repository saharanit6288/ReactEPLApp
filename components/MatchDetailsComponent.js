import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { List, ListItem, Card, Icon } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/Entypo';
import globalVar from '../config';


export default class MatchDetailsComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            //id = this.props.navigation.getParam('id', 'No Record Found'),
            match: {}
        };
      }

    componentDidMount() {
      this.setState({
          isLoading: false,
          match: this.props.navigation.getParam('match', 'No Record Found'),
      });
    }

    
    render() {
        //alert(JSON.stringify(this.state.player));
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 50}}>
                <ActivityIndicator/>
              </View>
            )
          }


      return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Card title={`${this.state.match.home_team} vs ${this.state.match.away_team}`}>
            <View style={styles.viewIconTextFlexJustifyCenter}>
                <Text  style={styles.text}>
                    {this.state.match.home_team_goals !== null ? this.state.match.home_team_goals : ""} 
                </Text>
                <Text style={styles.text}>
                    {this.state.match.status !== null ? this.state.match.status : ""}
                </Text>
                <Text style={styles.text}>
                    {this.state.match.away_team_goals !== null ? this.state.match.away_team_goals : ""}
                </Text>
            </View>
            <View style={styles.viewIconTextFlexJustifyCenter}>
                {
                    this.state.match.home_team_scorers.map((hmeGoalScr, i) => (
                        <View style={styles.viewIconTextFlexJustifyStart} key={i}>
                        <Text style={{flex:1,flexDirection:'column'}}>
                            {`${hmeGoalScr}`}
                        </Text>  
                        </View>
                    ))
                }
                <Text style={styles.text}>{' '}</Text>
                {
                    this.state.match.away_team_scorers.map((awyGoalScr, i) => (
                        <View style={styles.viewIconTextFlexJustifyStart} key={i}>
                        <Text style={{flex:1,flexDirection:'column'}}>
                            {`${awyGoalScr}`}
                        </Text> 
                        </View>
                    ))
                }
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
                />
            <View style={styles.viewIconTextFlexJustifyStart}>
                <Icon name='calendar' type='entypo' color='red' />
                <Text style={styles.text}>{`Date: ${this.state.match.date} ${this.state.match.local_time}`}</Text>
            </View>
            <View style={styles.viewIconTextFlexJustifyStart}>
                <Icon name='users' type='entypo' color='red' />
                <Text style={styles.text}>{`Attendance: ${this.state.match.attendance !== null ? this.state.match.attendance : ""}`}</Text>
            </View>
            <View style={styles.viewIconTextFlexJustifyStart}>
                <Icon name='location' type='entypo' color='red' />
                <Text style={styles.text}>{`Venue: ${this.state.match.venue}`}</Text>
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
    },
    fullText: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5 
    }
  })
