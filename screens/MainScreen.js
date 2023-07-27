import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Text, View, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import EventScreen from './EventScreen';
import RecommendScreen from './RecommendScreen';
import NotificationScreen from './NotificationScreen';
import NewMovieScreen from './NewmovieScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createMaterialBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
          <Icon name="home" color={color} size={size} />,
          tabBarColor: 'black',
      }}
    />
    <Tab.Screen
      name="Event"
      component={EventScreen}
      options={{
        title: '이벤트',
        tabBarIcon: ({color, size}) =>
          <Icon name="search" color={color} size={size} />,
          tabBarColor: 'gray',
       }}
     />
     <Tab.Screen
      name="Newmovie"
      component={NewMovieScreen}
      options={{
        title: '최신 개봉작',
        tabBarIcon: ({color, size}) =>
          <Icon name="star" color={color} size={size} />,
          tabBarColor: 'black',
       }}
     />
     <Tab.Screen
       name="Recommendation"
       component={RecommendScreen}
       options={{
         title: '추천',
         tabBarIcon: ({color, size}) => 
            <Icon name="movie" color={color} size={size} />,
            tabBarColor: 'green',
       }}
     />
     <Tab.Screen
         name="Notifications"
         component={NotificationScreen}
         options={{
           title: '알림',
           tabBarIcon: ({color, size}) => 
             <Icon name="notifications" color={color} size={size} />,
             tabBarColor: 'blue',
         }}
       />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ 
          title: '개인 정보',
          tabBarIcon: ({color, size}) => 
            <Icon name="profile" color={color} size={size} />,
            tabBarColor: 'blue',
        }}
      />
     </Tab.Navigator>
  );
}



export default MainScreen;