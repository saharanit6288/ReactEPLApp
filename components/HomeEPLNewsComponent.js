import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { List, ListItem, Card } from 'react-native-elements';
import globalVar from '../config';

export default class HomeEPLNewsComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            newsList: []
        };
      }

    componentDidMount() {
        this.fetchSportsNews();
    }

    fetchSportsNews() {
        let term = encodeURIComponent('epl');
        let urlPath = globalVar.NewsUrl  + "v2/top-headlines?category=sports&q="+term+"&page=1&pageSize=40";
        var config = { headers: { Authorization: `Bearer ${globalVar.NewsApiKey}` } };

        fetch(urlPath,config)
        .then((response) => response.json())
        .then((responseJson) => {
            //alert(JSON.stringify(responseJson.articles));
            this.setState({
                isLoading: false,
                newsList: responseJson.articles,
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
            this.state.newsList.map((item, i) => (
                <TouchableOpacity onPress={ ()=>{ Linking.openURL(item.url)}} key={i}>
                    <Card
                        title={item.title}
                        image={{uri:item.urlToImage}}>
                        <Text style={{marginBottom: 10}}>
                            {item.description}
                        </Text>
                    </Card>
                </TouchableOpacity>
            ))
        }
        <Text style={{padding: 10, fontStyle: 'italic'}}>**Sources: https://newsapi.org/</Text>
        </ScrollView>
      );
    }
  }

  const styles = StyleSheet.create({
    
    main: {
        flex: 1   
    }
  })
