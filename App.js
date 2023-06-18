import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import RecommendScreen from './screens/RecommendScreen';
import EventScreen from './screens/EventScreen';
import NotificationScreen from './screens/NotificationScreen';
import NewmovieScreen from './screens/NewmovieScreen';
import * as Notifications from 'expo-notifications';

const Stack = createNativeStackNavigator();

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route);
  const nameMap = {
    Home: 'MosyMovie',
    Event: '영화 이벤트',
    Newmovie: '최신 개봉작',
    Recommendation: '영화 추천',
    Notifications: '푸쉬 알림',
  };

  return nameMap[routeName];
}

function App() {
  useEffect(() => {
    registerForPushNotifications();
    Notifications.addNotificationReceivedListener(handleNotification);
  }, []);

  const registerForPushNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Push Notification Token:', token);
    // 푸시 알림 토큰을 서버로 전송하거나 필요한 곳에 저장하는 등의 작업을 수행
  };

  const handleNotification = (notification) => {
    // 푸시 알림을 수신한 경우 처리할 작업을 수행합니다.
    console.log('Received notification:', notification);
    // 알림 내용을 확인하고 사용자에게 알림을 표시하거나 필요한 동작을 수행
  };
    
  // Expo 알림 서비스에 핸들러 등록
  Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MosyMovie"
          component={MainScreen}
          options={({ route }) => ({
            title: getHeaderTitle(route),
          })}
        />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Event" component={EventScreen} />
        <Stack.Screen name="Newmovie" component={NewmovieScreen} />
        <Stack.Screen name="Recommendation" component={RecommendScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default App;
