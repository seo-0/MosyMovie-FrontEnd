import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Notifications } from 'expo-notifications';
// import { registerForPushNotificationsAsync } from '../utilities/pushNotifications';

const NotificationScreen = () => {
  useEffect(() => {
    registerForPushNotifications();
    Notifications.addNotificationReceivedListener(handleNotification); // 수정된 부분
  }, []);

  const registerForPushNotifications = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      Alert.alert('권한 거부', '푸시 알림 권한이 거부되었습니다.');
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    console.log('Push Notification Token:', token);

    // Expo 알림 서비스에 핸들러 등록
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  };


  const handleNotification = (notification) => {
    // 푸시 알림을 수신한 경우 처리할 작업을 수행합니다.
    console.log('Received notification:', notification);
    // 알림 내용을 확인하고 사용자에게 알림을 표시하거나 필요한 동작을 수행할 수 있습니다.
  };

  const sendTestNotification = async () => {
    // 테스트를 위해 임의의 푸시 알림을 보내는 함수입니다.
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '범죄도시3 개봉 예정',
        body: '범죄도시3가 곧 상영을 시작합니다!',
      },
      trigger: {
        seconds: 3, //onPress가 클릭이 되면 60초 뒤에 알람이 발생합니다.
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>영화 개봉 예정 알림</Text>
      <Button title="푸시 알림 보내기" onPress={sendTestNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default NotificationScreen;
