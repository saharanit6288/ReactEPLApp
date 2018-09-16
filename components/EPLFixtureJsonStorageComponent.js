import React from 'react';
import { View, Text } from 'react-native';
import globalVar from '../config';
import Storage from '../Storage';

export default class EPLFixtureJsonStorageComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            EPLFixtureResponseJson: {}
        }
      }

      async componentDidMount () {
        //this.fetchEPLFixtureJson();

        let urlPath = globalVar.EPLFixtureJson;

        fetch(urlPath)
        .then((response) => response.json())
        .then((responseJson) => {
            
            this.setState({
                isLoading: false,
                EPLFixtureResponseJson: responseJson,
            }, function(){

            });

        })
        .catch((error) =>{
            console.error(error);
        });

        alert(JSON.stringify(this.state.EPLFixtureResponseJson));

        await Storage.setItem("EPLFixtureResponseJson", JSON.stringify(this.state.EPLFixtureResponseJson));

        let obj = await Storage.getItem("EPLFixtureResponseJson");
        alert(JSON.stringify(obj));

    }

    fetchEPLFixtureJson() {
        let urlPath = globalVar.EPLFixtureJson;

        fetch(urlPath)
        .then((response) => response.json())
        .then((responseJson) => {
            alert(JSON.stringify(responseJson));
            this.setState({
                isLoading: false,
                EPLFixtureResponseJson: responseJson,
            }, function(){

            });

        })
        .catch((error) =>{
            console.error(error);
        });

    }

    render() {
        return (
          <Text />
        );
      }
    
}

