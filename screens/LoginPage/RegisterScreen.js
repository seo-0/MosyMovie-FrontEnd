import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Switch, Text, Image, SafeAreaView, Modal, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import MosyMovie from '../images/MosyMovie.jpg';

const RegisterScreen = ({ navigation }) => {
  const [emailId, setEmailId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setEmailVerified] = useState(false); // 이메일 인증 확인
  const [registerModal, setRegisterModal] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://152.67.204.227:8080/signup', {
        emailId,
        name,
        password,
      });
      const data = response.data;
      
      console.log('회원 정보가 백엔드로 전송되었습니다.');
      // 백엔드로부터의 응답 처리
      Alert.alert('회원가입이 정상처리 되었습니다.');
      navigation.goBack();
    } catch (error) {
      console.log('회원가입 에러: ', error);
      Alert.alert('회원가입 에러', 'Failed to register');
    }
  };

  const handleEmailVerification= async () => {
    try{
      const response = await axios.post('http://152.67.204.227:8080/signup/mailConfirm', { emailId });
      const data = response.data;

      Alert.alert("인증메일이 전송되었습니다. 메일을 확인하세요.");
      setEmailVerified(true);
    }
    catch(error) {
      console.log("이메일 인증 에러: ", error);
      Alert.alert("이메일 인증 에러", 'fail to send email verification');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post('http://152.67.204.227:8080/verifyCode', {
        emailId,
        code: verificationCode,
      });
      if (response.data.success) { // 백엔드에서 응답의 success 필드를 통해 인증 성공 여부를 확인
        setEmailVerified(true);
        Alert.alert("인증 성공!", "이메일 인증이 완료되었습니다.");
      } else {
        Alert.alert("인증 실패", "인증 코드가 잘못되었습니다.");
      }
    } catch (error) {
      console.log("인증 코드 검증 에러: ", error);
      Alert.alert("인증 코드 검증 에러", "Fail to verify code");
    }
  };

  const handleLogin = async () => {
    navigation.navigate('LoginScreen'); // 로그인 페이지로 이동
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Text}>
        <Text style={styles.TextStyle}>MosyMovie</Text>
      </View>
      <TextInput
        style={styles.textinput}
        placeholder="이메일"
        onChangeText={text => setEmailId(text)}
        value={emailId}
      />
      {!isEmailVerified && (
        <View>
          <TouchableOpacity
            title="이메일 인증하기"
            onPress={handleEmailVerification}
            style={styles.emailVerificationButton} // 새로운 스타일 속성 추가
          >
            <Text style={styles.buttonText}>이메일 인증하기</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.textinput}
            placeholder="인증 코드 입력"
            onChangeText={text => setVerificationCode(text)}
            value={verificationCode}
          />
          <TouchableOpacity
            title="코드 인증"
            onPress={handleVerifyCode}
            style={styles.codeVerificationButton} // 새로운 스타일 속성 추가
          >
            <Text style={styles.buttonText}>코드 인증</Text>
          </TouchableOpacity>
        </View>
      )}
      <TextInput
        style={styles.textinput}
        placeholder="사용자이름"
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.textinput}
        placeholder="비밀번호"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <TouchableOpacity
        title="회원가입"
        onPress={handleRegister}
        style={styles.registerButton} // 새로운 스타일 속성 추가
      >
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
      <Modal
        animationType='slide'
        transparent={true}
        visible={registerModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>준비중 입니다.</Text>
            <TouchableOpacity
              style={styles.openButton}
              onPress={() => {
                setRegisterModal(!registerModal);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    margin: 30,
    borderRadius: 8,
    backgroundColor: 'olive',
    padding: 20,
  },
  TextStyle: {
    textAlign: 'center',
    color: 'navy',
    fontSize: 60,
    fontWeight: 'bold',
  },
  textinput: {
    marginTop: 20,
    height: 40,
    width: 300,
    borderColor: 'blue',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  emailVerificationButton: {
    marginTop: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'darkgreen',
  },
  codeVerificationButton: {
    marginTop: 10,
    backgroundColor: 'navy',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'darkblue',
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: 'orangered',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'red',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default RegisterScreen;
