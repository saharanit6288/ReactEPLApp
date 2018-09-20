import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Linking, TouchableOpacity, FlatList, ListView , SearchBar } from 'react-native';
import { List, ListItem, Card } from 'react-native-elements';
import globalVar from '../config';
import InfiniteScroll from 'react-native-infinite-scroll';


export default class PlayerListComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            isLoadMore: true,
            playerList: [],
            page: 1,
            perPage: 10,
            allPlayers: []
        };
      }
    
    
    paginate(arr, perpage, page) {
      return arr.slice(perpage*(page-1), perpage*page);
    }

    singleDimensionalUniqueArr(arr) {
      return Array.from(new Set(arr.map(JSON.stringify))).map(JSON.parse);
    }
	
	
    componentDidMount() {
        this.fetchEPLPlayers();
    }

    fetchEPLPlayers() {
        let urlPath = globalVar.EPLFixtureJson;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let _perpage = this.state.perPage;
        let _page = this.state.page;

        fetch(urlPath)
        .then((response) => response.json())
        .then((responseJson) => {
            var _allPlayers = responseJson.players;
            var data = this.paginate(_allPlayers,_perpage,_page);
            var _Page = _page+1;
            //alert(JSON.stringify(responseJson.articles));
            this.setState({
                isLoading: false,
                playerList: data,
                dataSource: ds.cloneWithRows(data),
                page: _Page,
                allPlayers: _allPlayers
            }, function(){

            });

        })
        .catch((error) =>{
            console.error(error);
        });

    }

    loadMorePage() {
      let rows = this.state.playerList;
      let _perpage = this.state.perPage;
      let _page = this.state.page;
      let _allPlayers = this.state.allPlayers;
      
      var data = this.paginate(_allPlayers,_perpage,_page);
      rows.push.apply(rows, data);
        
      var uniqueRows = this.singleDimensionalUniqueArr(rows);
      
      var _Page = _page;
      var _isLoadMore = false;

      if(data.length > 0)
      {
          _Page= _page+1;
          _isLoadMore = true;
      }

      this.setState({
          playerList: uniqueRows,
          dataSource: this.state.dataSource.cloneWithRows(uniqueRows),
          page: _Page,
          isLoadMore: _isLoadMore
        }, function(){

        });
      
    }

    // loadMorePage(){
    //   let urlPath = globalVar.EPLFixtureJson;
    //   let rows = this.state.playerList;
    //   let _perpage = this.state.perPage;
    //   let _page = this.state.page;
      
      
    //   fetch(urlPath)
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //       var data = this.paginate(responseJson.players,_perpage,_page);
    //       rows.push.apply(rows, data);
						
		//       var uniqueRows = this.singleDimensionalUniqueArr(rows);
          
    //       var _Page = _page;
    //       var _isLoadMore = false;

    //       if(data.length > 0)
    //       {
    //           _Page= _page+1;
    //           _isLoadMore = true;
    //       }

    //       this.setState({
    //           playerList: uniqueRows,
    //           dataSource: this.state.dataSource.cloneWithRows(uniqueRows),
    //           page: _Page,
    //           isLoadMore: _isLoadMore
    //       }, function(){

    //       });

    //   })
    //   .catch((error) =>{
    //       console.error(error);
    //   });
    // }
    
    
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
            style={{backgroundColor: '#fff'}}>
            <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(data)=>
              <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('PlayerDetails', {
                  player: data,
                });
              }}>
                <ListItem
                  title={`${data.first_name} ${data.last_name}`}
                  subtitle={data.current_club}
                  leftIcon={{name: 'user', type: 'entypo', style: { color: 'red' }}}
                />
              </TouchableOpacity>
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
    }
  })