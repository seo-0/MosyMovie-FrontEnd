import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const RecommendScreen = () => {
  const movies = [
    { id: 1, title: 'Notebook', image: require('./images/01.jpg') },
    { id: 2, title: '범죄도시3', image: require('./images/02.jpg') },
    { id: 3, title: 'AbouTime', image: require('./images/03.jpg') },
    { id: 4, title: 'Slamdunk', image: require('./images/04.jpg') },
    { id: 5, title: 'AbouTime', image: require('./images/05.jpg') },
    { id: 6, title: 'Notebook', image: require('./images/01.jpg') },
    { id: 7, title: '범죄도시3', image: require('./images/02.jpg') },
    { id: 8, title: 'AbouTime', image: require('./images/03.jpg') },
    { id: 9, title: 'Slamdunk', image: require('./images/04.jpg') },
    { id: 10, title: 'AbouTime', image: require('./images/05.jpg') },
  ];

  const renderMovieItem = ({ item }) => (
    <View style={styles.movieItem}>
      <Image source={item.image} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MosyMovie가 현재 추천 중인 영화를 둘러보세요!</Text>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.movieList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:0,
  },
  title: {
    marginVertical: 10,
    fontSize: 23,
    fontWeight: 'bold',
    color: 'magenta'
  },
  movieList: {
    paddingHorizontal: 16,
  },
  movieItem: {
    flex: 1,
    padding: 3,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 8,
  },
  movieImage: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  movieTitle: {
    padding: 20,
    fontSize: 16,
    marginTop: 8,
  },
});

export default RecommendScreen;
