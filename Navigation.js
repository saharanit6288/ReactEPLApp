import React from 'react';
import Icon  from 'react-native-vector-icons/Ionicons'; 
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from './tabs/HomeScreen';
import FixtureScreen from './tabs/FixtureScreen';
import StandingsScreen from './tabs/StandingsScreen';
import MoreScreen from './tabs/MoreScreen';
import StadiumScreen  from './screens/StadiumScreen';
import ClubScreen from './screens/ClubScreen';
import PlayerScreen from './screens/PlayerScreen';
import PlayerDetailsComponent from './components/PlayerDetailsComponent';
import ClubDetailsComponent from './components/ClubDetailsComponent';

const HomeStack = createStackNavigator({
    Home: { 
      screen: HomeScreen,
      navigationOptions: {
        title: 'EPL Top Headlines',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarVisible: true,
      },
    }
  });
  
  const FixtureStack = createStackNavigator({
    Fixture: { 
      screen: FixtureScreen,
      navigationOptions: {
        title: 'EPL Fixtures',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarVisible: true,
      },
     }
  });
  
  const StandingsStack = createStackNavigator({
    Standings: { 
      screen: StandingsScreen,
      navigationOptions: {
        title: 'Points Table',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarVisible: true,
      },
    
    }
  });
  
  const MoreStack = createStackNavigator({
    More: { 
      screen: MoreScreen,
      navigationOptions: {
        title: 'More Info',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarVisible: true,
      },
    
    },
    Stadium: { 
      screen: StadiumScreen,
      navigationOptions: {
        title: 'Stadiums',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarVisible: true,
      },
    
    },
    Player: { 
        screen: PlayerScreen,
        navigationOptions: {
            title: 'Players',
            headerStyle: {
            backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
            tabBarVisible: true,
        },
    
    },
    PlayerDetails: { 
        screen: PlayerDetailsComponent,
        navigationOptions: {
            title: 'Player Info',
            headerStyle: {
            backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
            tabBarVisible: true,
        },
    
    },
    Club: { 
        screen: ClubScreen,
        navigationOptions: {
            title: 'Clubs',
            headerStyle: {
            backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
            tabBarVisible: true,
        },
    
    },
    ClubDetails: { 
        screen: ClubDetailsComponent,
        navigationOptions: {
            title: 'Club Info',
            headerStyle: {
            backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
            tabBarVisible: true,
        },
    
    }
  });
  
  const BottomTabNavigator = createBottomTabNavigator({
    Home: { 
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon:({tintColor})=> (
          <Icon name='ios-home' color={tintColor} size={24} />
        )
      }
    },
    Fixture: { 
      screen: FixtureStack,
      navigationOptions: {
        tabBarLabel: 'Fixture',
        tabBarIcon:({tintColor})=> (
          <Icon name='ios-calendar' color={tintColor} size={24} />
        )
      } 
    },
    Standings: { 
      screen: StandingsStack,
      navigationOptions: {
        tabBarLabel: 'Standings',
        tabBarIcon:({tintColor})=> (
          <Icon name='ios-list' color={tintColor} size={24} />
        )
      } 
    },
    More: { 
      screen: MoreStack,
      navigationOptions: {
        tabBarLabel: 'More',
        tabBarIcon:({tintColor})=> (
          <Icon name='md-more' color={tintColor} size={24} />
        )
      } 
    }
  },{
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'black'
    }
  });

  
  export default BottomTabNavigator;