import React from 'react';

import BottomTabNavigator from './Navigation'; 

export default class App extends React.Component {
  render() {
    return <BottomTabNavigator />;
  }
}

// import Icon  from 'react-native-vector-icons/Ionicons'; 
// import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

// import HomeScreen from './tabs/HomeScreen';
// import FixtureScreen from './tabs/FixtureScreen';
// import StandingsScreen from './tabs/StandingsScreen';
// import MoreScreen from './tabs/MoreScreen';
// import StadiumScreen  from './screens/StadiumScreen';

// import MoreScreenLinksComponent from './components/MoreScreenLinksComponent';
// import StadiumScreenComponent from './components/StadiumScreenComponent';

// const MoreStack = createStackNavigator(
//   {
//     More: {
//       screen: MoreScreen,
//       navigationOptions: {
//         tabBarLabel: 'More'
//       }
//     },
//     Stadium: StadiumScreen,
//   },
//   {
//     initialRouteName: 'More',
//   }
// );




// export default TabNavigator(
//   {
//     Home: { screen: HomeScreen },
//     Fixture: { screen: FixtureScreen },
//     Standings: { screen: StandingsScreen },
//     More: { screen: MoreScreen },
//   },
//   {
//     navigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, tintColor }) => {
//         const { routeName } = navigation.state;
//         let iconName;
//         if (routeName === 'Home') {
//           iconName = `ios-home${focused ? '' : '-outline'}`;
//         } 
//         else if (routeName === 'Fixture') {
//           iconName = `calendar${focused ? '' : '-outline'}`;
//         }
//         else if (routeName === 'Standings') {
//           iconName = `list${focused ? '' : '-outline'}`;
//         }
//         else if (routeName === 'More') {
//           iconName = `md-more${focused ? '' : '-outline'}`;
//         }

//         // You can return any component that you like here! We usually use an
//         // icon component from react-native-vector-icons
//         return <Ionicons name={'ios-home'} size={25} color={'gray'} />;
//       },
//     }),
//     tabBarComponent: TabBarBottom,
//     tabBarPosition: 'bottom',
//     tabBarOptions: {
//       activeTintColor: 'tomato',
//       inactiveTintColor: 'gray',
//     },
//     animationEnabled: true,
//     swipeEnabled: true,
//   }
// );
