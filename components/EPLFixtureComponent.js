import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Linking, TouchableOpacity, ListView } from 'react-native';
import { List, ListItem, Card, Icon } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/Entypo';
import globalVar from '../config';
import InfiniteScroll from 'react-native-infinite-scroll';

export default class EPLFixtureComponent extends React.Component {

    constructor(props){
        super(props);
        
        this.state = { 
            isLoading: true,
            fixtureList: [],
            offset: 0,
            limit: 1
        };
      }

    
    componentDidMount() {
        this.fetchEPLFixtures();
    }

    fetchEPLFixtures() {
        let urlPath = globalVar.EPLFixtureJson;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        fetch(urlPath)
        .then((response) => response.json())
        .then((responseJson) => {
            var data = responseJson.season_fixtures.slice(this.state.offset, this.state.limit); 
            var offset = this.state.offset + 1;
            var limit = this.state.limit + 1;
            //alert(JSON.stringify(responseJson.articles));
            this.setState({
                isLoading: false,
                fixtureList: data,
                dataSource: ds.cloneWithRows(data),
                offset: offset,
                limit: limit
            }, function(){

            });

        })
        .catch((error) =>{
            console.error(error);
        });

    }

    loadMorePage(){
        let urlPath = globalVar.EPLFixtureJson;
        let rows = this.state.fixtureList;
        let offset = this.state.offset;
        let limit = this.state.limit;
        
        fetch(urlPath)
        .then((response) => response.json())
        .then((responseJson) => {
            var data = responseJson.season_fixtures.slice(offset, limit); 
            offset = offset + 1;
            limit = limit + 1;
            // alert(offset+'-'+limit);
            // alert(JSON.stringify(data));
            rows.push.apply(rows, data);
            
            this.setState({
                fixtureList: rows,
                dataSource: this.state.dataSource.cloneWithRows(rows),
                offset: offset,
                limit: limit
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
        <InfiniteScroll
            horizontal={false}  
            onLoadMoreAsync={this.loadMorePage.bind(this)}
            distanceFromEnd={10}
            style={styles.scrollView}>
            <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(data)=>
                <Card
                    title={`Match Week ${data.matchday}`}>
                        {
                        data.fixtures.map((item, j) => (
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
            }
            />
        <Text style={{padding: 10, fontStyle: 'italic'}}>**Sources: https://github.com/drraq/PremierLeague.json</Text>
        </InfiniteScroll>
        // <ScrollView contentContainerStyle={{flexGrow: 1}}>
        // {
        //     this.state.fixtureList.map((fxtr, i) => (
        //         <Card
        //             title={`Match Week ${fxtr.matchday}`}
        //             key={i}>
        //                 {
        //                 fxtr.fixtures.map((item, j) => (
        //                     <TouchableOpacity key={j}
        //                         onPress={() => {
        //                         this.props.navigation.navigate('MatchDetails', {
        //                             match: item
        //                         });
        //                         }}>
        //                         <ListItem
        //                             title={
        //                                 <View style={styles.viewIconTextFlexJustifyCenter}>
        //                                     <Icon name='sports-club' type='entypo' color='red' />
        //                                     <Text  style={styles.text}>
        //                                         {item.home_team_code} 
        //                                     </Text>
        //                                     <Text style={styles.text}>
        //                                         {item.status === 'FT' ? item.full_time_score !==null ? item.full_time_score : '-' : item.half_time_score !== null ? item.half_time_score : '-'}
        //                                     </Text>
        //                                     <Text style={styles.text}>
        //                                         {item.away_team_code}
        //                                     </Text>
        //                                     <Icon name='sports-club' type='entypo' color='red' />
        //                                 </View>
        //                             }
        //                             subtitle={
        //                                 <View style={styles.viewIconTextFlexJustifyStart}>
        //                                     <Icon name='calendar' type='entypo' color='red' />
        //                                     <Text style={styles.text}>{item.date}</Text>
        //                                     <Icon name='location' type='entypo' color='red' />
        //                                     <Text style={styles.text}>{item.venue}</Text>
        //                                 </View>
        //                             }
        //                         />
        //                     </TouchableOpacity>
        //                 ))
        //                 }
        //         </Card>
        //     ))
        // }
        // <Text style={{padding: 10, fontStyle: 'italic'}}>**Sources: https://github.com/drraq/PremierLeague.json</Text>
        // </ScrollView>
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
