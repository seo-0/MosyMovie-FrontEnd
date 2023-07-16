import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Linking, Image, FlatList } from 'react-native';
import axios from 'axios';


const EventScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  
  const apiUrl = "http://152.67.204.227:8080/events"; // API URL을 변수에 저장

  const fetchEvents = async () => {
  try {
    setError(null);
    setEvents([]); // 이벤트 초기화
    setLoading(true); // 로딩 상태 true

    const response = await axios.get(apiUrl); // apiUrl 사용
    const data = response.data;
    setEvents(data); // 받아온 데이터 저장
  } catch (error) {
    setError(error);
    console.log('Error fetching events:', error);
  }
  setLoading(false); // 로딩 끄기
};
  
    useEffect(() => {
      fetchEvents();
    }, []);

  if (loading) return <View style={{margin: 50, width: 300, height: 200}}><Text>로딩 중..</Text></View>;
  if (error) return <View style={{margin: 50, width: 300, height: 200}}><Text>에러가 발생했습니다.</Text></View>;
  if (!events) return null;

  const handleImagePress = (itemId, url) => {
    setSelectedItemId(itemId);
    Linking.openURL(url);
  };

  const renderEventItem = () => {
      return events.map((item) => (
        <TouchableHighlight
          key={item.id}
          onPress={() => handleImagePress(item.id, item.url)}
          underlayColor="transparent"
        >
          <View style={styles.eventItem}>
            <Image source={{uri: item.image}} style={styles.eventImage} />
            <View style={styles.eventTextContainer}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventPeriod}>행사 기간: {item.period}</Text>
            </View>
          </View>
        </TouchableHighlight>
      ));
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> 현재 상영중인 영화 이벤트를 확인하세요! </Text>
      <Text style={styles.title1}>(클릭 시 롯데시네마로 이동합니다.) </Text>

      <FlatList
        data={events}
        keyExtractor={(item) => (item && item.id ? item.id.toString() : '')}
        renderItem={renderEventItem}
      />
        <TouchableOpacity activeOpacity={1} onPress={fetchEvents} style={styles.button}>
        <Text style={styles.buttonText}>새로고침</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    color: 'gray',
    marginVertical: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  title1: {
    color: 'olive',
    marginVertical: 5,
    fontSize: 17,
    fontWeight: 'bold',
  },
  eventItem: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  eventPeriod:{
    justifyContent: 'center',
    marginLeft:20,
  },
  eventImage: {
    width: 390,
    height: 200,
    marginRight: 15,
    borderRadius: 20,
  },
  eventTitle: {
    padding: 17,
    fontSize: 18,
    fontWeight: 'bold',
    flexWrap: 'wrap'
  },
  button: {
    backgroundColor: 'green',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventScreen;
