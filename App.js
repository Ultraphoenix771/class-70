
import React from 'react';
import {Image}from "react-native"
import {createAppContainer}from "react-navigation"
import {createBottomNavigator, createBottomTabNavigator}from "react-navigation-tabs"
import TransactionScreen from './screens/TransactionScreen'
import SearchScreen from './screens/SearchScreen'

export default class App extends React.Component {
  render(){
    return (
      <AppContainer/>
    );
  }
  
}
const TabNavigator = createBottomTabNavigator({
  TransactionScreen:{screen:TransactionScreen},
  SearchScreen:{screen:SearchScreen}
},
{
defaultNavigationOptions:({navigation})=>({
tabBarIcon:({})=>{
  const rootname = navigation.state.routeName
  if(rootname==="TransactionScreen"){
    return(
      <Image
      source={require("./assets/book.png")}
      style = {{width:40,height:40}}/>
    )
  }
  else if(rootname==="SearchScreen"){
    return(
      <Image
      source={require("./assets/searchingbook.png")}
      style = {{width:40,height:40}}/>
    )
  }

}
})
})

const AppContainer = createAppContainer(TabNavigator)
