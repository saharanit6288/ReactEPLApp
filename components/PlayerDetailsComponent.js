import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { List, ListItem, Card, Icon } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/Entypo';
import globalVar from '../config';


export default class PlayerDetailsComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            //id = this.props.navigation.getParam('id', 'No Record Found'),
            player: {}
        };
      }

    componentDidMount() {
      this.setState({
          isLoading: false,
          player: this.props.navigation.getParam('player', 'No Record Found'),
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
        <Card title={`${this.state.player.first_name} ${this.state.player.last_name}`}>
            <View style={styles.viewIconText}>
                <Icon name='sports-club' type='entypo' color='red' />
                <Text style={styles.text}>{`Club: ${this.state.player.current_club}`}</Text>
            </View>
            <View style={styles.viewIconText}>
                <Icon name='flag-o' type='font-awesome' color='red' />
                <Text style={styles.text}>{`Nationality: ${this.state.player.nationality}`}</Text>
            </View>
            <View style={styles.viewIconText}>
                <Icon name='man' type='entypo' color='red' />
                <Text style={styles.text}>{`Position: ${this.state.player.position}`}</Text>
            </View>
            <View style={styles.viewIconText}>
                <Icon name='barcode' type='font-awesome' color='red' />
                <Text style={styles.text}>{`Jersey #: ${this.state.player.jersey_number}`}</Text>
            </View>
        </Card>
        <Card title='Statictics'>
            <View style={styles.viewIconText}>
                <Text h3>{`Appearances: ${this.state.player.appearances !== null ? this.state.player.appearances : "0"}`}</Text>
            </View>
            <View style={styles.viewIconText}>
                <Text h3>{`Substitute: ${this.state.player.substitute_appearances !== null ? this.state.player.substitute_appearances : "0"}`}</Text>
            </View>
            <View style={styles.viewIconText}>
                <Text h3>{`Goals: ${this.state.player.goals_scored !== null ? this.state.player.goals_scored : "0"}`}</Text>
            </View>
            <View style={styles.viewIconText}>
                <Text h3>{`Own Goals: ${this.state.player.own_goals !== null ? this.state.player.own_goals : "0"}`}</Text>
            </View>
            <View style={styles.viewIconText}>
                <Text h3>{`Assists: ${this.state.player.assists_made !== null ? this.state.player.assists_made : "0"}`}</Text>
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