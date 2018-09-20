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
            isLoadMore: true,
            fixtureList: [],
            page: 1,
            perPage: 1 
        };
      }

    
    componentDidMount() {
        this.fetchEPLFixtures();
    }

    paginate(arr, perpage, page) {
        return arr.slice(perpage*(page-1), perpage*page);
    }

    multiDimensionalUniqueArr(arr) {
		var uniques = [];
		var itemsFound = {};
		for(var i = 0, l = arr.length; i < l; i++) {
			var stringified = JSON.stringify(arr[i]);
			if(itemsFound[stringified]) { continue; }
			uniques.push(arr[i]);
			itemsFound[stringified] = true;
		}
		return uniques;
	}

    fetchEPLFixtures() {
        let urlPath = globalVar.EPLFixtureJson;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let _perpage = this.state.perPage;
        let _page = this.state.page;

        fetch(urlPath)
        .then((response) => response.json())
        .then((responseJson) => {
            var data = this.paginate(responseJson.season_fixtures,_perpage,_page);
            var _Page = _page+1;
            this.setState({
                isLoading: false,
                fixtureList: data,
                dataSource: ds.cloneWithRows(data),
                page: _Page
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
        let _perpage = this.state.perPage;
        let _page = this.state.page;
        
        
        fetch(urlPath)
        .then((response) => response.json())
        .then((responseJson) => {
            
            var data = this.paginate(responseJson.season_fixtures,_perpage,_page);
            rows.push.apply(rows, data);
            var uniqueRows = this.multiDimensionalUniqueArr(rows);
          
            var _Page = _page;
            var _isLoadMore = false;

            if(data.length > 0)
            {
                _Page= _page+1;
                _isLoadMore = true;
            }
            
            this.setState({
                fixtureList: uniqueRows,
                dataSource: this.state.dataSource.cloneWithRows(uniqueRows),
                page: _Page,
                isLoadMore: _isLoadMore
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

      const _isLoadMore = this.state.isLoadMore;
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
            {_isLoadMore ? (
                <View style={{flex: 1, padding: 10}}>
                    <ActivityIndicator/>
                </View>
            ) : (
                <View></View>
            )}
            <Text style={{padding: 10, fontStyle: 'italic'}}>**Sources: https://github.com/drraq/PremierLeague.json</Text>
        </InfiniteScroll>
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
