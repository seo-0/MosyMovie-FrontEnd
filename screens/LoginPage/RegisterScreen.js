import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [emailId, setEmailId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setEmailVerified] = useState(false); // 이메일 인증 확인

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://152.67.204.227:8080/signup', {
        emailId,
        name,
        password,
        alarmReceive,
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


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        onChangeText={text => setEmailId(text)}
        value={emailId}
      />
      {!isEmailVerified && (
        <View>
          <Button title="이메일 인증하기" onPress={handleEmailVerification} />
          <TextInput
            style={styles.input}
            placeholder="인증 코드 입력"
            onChangeText={text => setVerificationCode(text)}
            value={verificationCode}
          />
          <Button title="코드 인증" onPress={handleVerifyCode} />
        </View>)}
      <TextInput
        style={styles.input}
        placeholder="사용자이름"
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button title="회원가입" onPress={handleRegister} />
      <View style={{marginTop: 20}}>
        <Text>아직 회원이 아니라면?</Text>
        <Text 
          style={{color: 'blue', textDecorationLine: 'underline'}}
          onPress={() => navigation.navigate('LoginScreen')}>로그인 화면으로 이동</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default RegisterScreen;
