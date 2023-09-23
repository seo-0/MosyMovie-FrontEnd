import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import RecommendScreen from './screens/RecommendScreen';
import HomeScreen from './screens/HomeScreen';
import EventScreen from './screens/EventScreen';
import NewmovieScreen from './screens/NewmovieScreen';
import LoginScreen from './screens/LoginPage/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/LoginPage/RegisterScreen';

const Stack = createNativeStackNavigator();

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route);
  const nameMap = {
    Home: 'MosyMovie',
    Event: '영화 이벤트',
    Newmovie: '최신 개봉작',
    Recommendation: '영화 추천',
    Profile: '프로필',
  };

  return nameMap[routeName];
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MosyMovie"
          component={MainScreen}
          options={({ route }) => ({
            title: getHeaderTitle(route),
          })}
        />
        <Stack.Screen name="Event" component={EventScreen} />
        <Stack.Screen name="Newmovie" component={NewmovieScreen} />
        <Stack.Screen name="Recommendation" component={RecommendScreen} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: '개인 정보' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
