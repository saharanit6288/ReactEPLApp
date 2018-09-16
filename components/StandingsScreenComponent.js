import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { List, ListItem, Card } from 'react-native-elements';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import globalVar from '../config';


export default class StandingsScreenComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            tableHead: ['#', 'Name', 'Played', 'Wins','Losses','Draws','Points'],
            tableData: [],
            widthArr: [25,95,45,45,45,45,45],
            flexArr: [0.8,2,1,1,1.2,1,1]
        };
      }

    componentDidMount() {
        this.fetchEPLPointsTable();
    }

    fetchEPLPointsTable() {
        let urlPath = globalVar.EPLFixtureJson;

        fetch(urlPath)
        .then((response) => response.json())
        .then((responseJson) => {
            let standingList = responseJson.clubs.sort(function(a, b){
                                                        return b.points - a.points || a.position - b.position;
                                                    });

            //alert(JSON.stringify(standingList));

            let standingArr = [];

            standingList.forEach(function(item) {
                standingArr.push(new Array(
                    item.position,
                    item.short_name,
                    item.games_played,
                    item.wins,
                    item.losses,
                    item.draws,
                    item.points,
                ));
              });

            
            //alert(JSON.stringify(standingArr));
            this.setState({
                isLoading: false,
                tableData: standingArr,
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

      const state = this.state;
      return (
        <ScrollView>
        <View style={styles.container}>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
            <Row data={state.tableHead} flexArr={state.flexArr} style={styles.head} textStyle={styles.rowHeadText}/>
            <Rows data={state.tableData} flexArr={state.flexArr} textStyle={styles.rowsText}/>
            </Table>
        </View>
        <Text style={{padding: 10, fontStyle: 'italic'}}>**Sources: https://github.com/drraq/PremierLeague.json</Text>
        </ScrollView>
      );
    }
  }

  const styles = StyleSheet.create({
    container: { flex: 1, padding: 5, paddingTop: 5 },
    head: { height: 30, backgroundColor: 'tomato' },
    rowHeadText: { textAlign: 'center', fontWeight: '100', color: '#fff' },
    rowsText: { textAlign: 'center', fontWeight: '100', color: 'tomato' }
  });

