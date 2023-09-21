import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Text, View, StyleSheet, Button} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// import LoginScreen from './LoginPage/LoginScreen';

import EventScreen from './EventScreen';
import RecommendScreen from './RecommendScreen';
import NewMovieScreen from './NewmovieScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createMaterialBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator
      initialRouteName="LoginScreen"
      tabBarOptions={{
        showIcon: true,
      }}
      >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: '홈',
        tabBarIcon: ({color, size}) => 
        <MaterialIcons name="home" size={size} color={color} />,
          tabBarColor: 'black',
      }}
    />
    <Tab.Screen
      name="Event"
      component={EventScreen}
      options={{
        title: '이벤트',
        tabBarIcon: ({color, size}) =>
        <MaterialIcons name="search" size={size} color={color} />,
          tabBarColor: 'gray',
       }}
     />
     <Tab.Screen
      name="Newmovie"
      component={NewMovieScreen}
      options={{
        title: '최신 개봉작',
        tabBarIcon: ({color, size}) =>
        <MaterialIcons name="star" size={size} color={color} />,
          tabBarColor: 'black',
       }}
     />
     <Tab.Screen
       name="Recommendation"
       component={RecommendScreen}
       options={{
         title: '추천',
         tabBarIcon: ({color, size}) => 
         <MaterialIcons name="movie" size={size} color={color} />,
         tabBarColor: 'green',
       }}
     />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ 
          title: '개인 정보',
          tabBarIcon: ({color, size}) => 
          <MaterialIcons name="profile" size={size} color={color} />,
          tabBarColor: 'blue',
        }}
      />
     </Tab.Navigator>
  );
}



export default MainScreen;