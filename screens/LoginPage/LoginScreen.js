import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Switch, Platform, TouchableWithoutFeedback, Text, Keyboard, Image, SafeAreaView, TouchableHighlight, Modal, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // 추가됨
import MosyMovie from '../images/MosyMovie.jpg';

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInModal, setSignInModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleLogin = async () => {
    try {
      // 1. 백엔드로 로그인 요청을 보냅니다.
      const response = await axios.post('http://152.67.204.227:8080/login', {
        email: email,
        password: password,
      });

      if (response.status === 200 && response.data) {
        const { access_token, refresh_token } = response.data;

        // 2. 받아온 토큰을 저장합니다.
        await AsyncStorage.setItem('access_token', access_token);
        await AsyncStorage.setItem('refresh_token', refresh_token);

        // ... (성공 시, 다른 페이지로 리다이렉션 등의 추가 로직을 여기에 추가)
        navigation.navigate('HomeScreen');  
        // 알림 권한 요청
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('권한 거부', '푸시 알림 권한이 거부되었습니다.');
        }

      } else {
        // 로그인 실패 처리
        setEmail('');
        setPassword('');
        Alert.alert('부적절한 로그인 시도입니다.');
      }
    } catch (error) {
      // 에러 처리
      console.error(error);
      Alert.alert('로그인 도중 에러가 발생했습니다. 다시 시도하세요.');
    }
  };

  const handleRegister = async () => {
    navigation.navigate('RegisterScreen'); // 회원가입 페이지로 이동
  };

  return (
    <SafeAreaView style={styles.container}> 
    <View style={styles.Text}>
      <Text style={styles.TextStyle}>MosyMovie</Text>
    </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput
            style={styles.textinput}
            placeholder="이메일"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.textinput}
            placeholder="비밀번호"
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <View style={styles.switchView}>
            <Text style={styles.switchText}>자동 로그인</Text>
            <Switch
              style={{ marginLeft: 10 }}
              value={isEnabled}
              trackColor={{ true: 'blue' }}
              onValueChange={toggleSwitch}
            />
          </View>
          <TouchableHighlight onPress={handleLogin}>
            <View style={styles.btnContainer}>
              <Text style={styles.textStyle}>Log In</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{ marginTop: 15 }} onPress={handleRegister}>
            <View style={styles.btnContainer}>
              <Text style={styles.textStyle}>Sign In</Text>
            </View>
          </TouchableHighlight>
        </View>
      </TouchableWithoutFeedback>
      <Modal
        animationType='slide'
        transparent={true}
        visible={signInModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>준비중 입니다.</Text>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                setSignInModal(!signInModal);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Modal
        animationType='slide'
        transparent={true}
        visible={loginModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{email === '' ? 'Error!' : `Welcome ${email}!`}</Text>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                setLoginModal(!loginModal);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Text: {
    margin: 20,
    borderRadius: 8,
    // View 컴포넌트의 스타일 설정
    backgroundColor: 'olive', // 배경 색상
    padding: 20, // 내부 여백
  },
  TextStyle: {
    textAlign: 'center',
    // Text 컴포넌트의 스타일 설정
    color: 'navy', // 텍스트 색상
    fontSize: 60, // 폰트 크기
    fontWeight: 'bold', // 폰트 굵기
  },
  inner: {
    padding: 30,
    flex: 1
  },
  textinput: {
    marginTop: 20,
    height: 40,
    borderColor: 'blue',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  switchText: {
    marginTop: 6,
    fontSize: 14
  },
  switchView: {
    marginBottom: 15,
    flexDirection: 'row'
  },
  btnContainer: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'navy',
    borderColor: 'black',
    borderWidth: 1
  },
  textStyle: {
    fontSize: 20,
    color: 'olive',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
});

export default LoginScreen;
