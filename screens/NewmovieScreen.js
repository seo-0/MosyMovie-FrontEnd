import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import axios from 'axios';

const NewMovieScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = "http://152.67.204.227:8080/api/recentMovies";

  const fetchMovies = async () => {
    try {
      setError(null);
      setMovies([]);
      setLoading(true);

      const response = await axios.get(apiUrl);
      const data = response.data;
      setMovies(data);
    } catch (error) {
      setError(error);
      console.log('Error fetching movies:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) return <View style={{margin: 50, width: 300, height: 200}}><Text>로딩 중..</Text></View>;
  if (error) return <View style={{margin: 50, width: 300, height: 200}}><Text>에러가 발생했습니다.</Text></View>;
  if (!movies) return null;

  const renderMovieItem = ({ item }) => {
    return (
        <View key={`movie_${item.id}`} style={styles.posterImage}>
        <Image
          source={{ uri: item.posterImage }}
          style={styles.movieImage}
          resizeMode="cover"
        />
        <View style={styles.eventTextContainer}>
              <Text style={styles.movieTitle}>{item.title}</Text>
        </View>
      </View>
    );
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>최신 개봉작을 확인하세요!</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => `movie_${item.id}`}
        renderItem={renderMovieItem}
        numColumns={2}
      />
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
    padding: 5,
    fontSize: 20,
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 16,
    color: 'skyblue',
  },
  movieItem: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginVertical: 8,
    padding: 10,
    margin: 10,
  },
  movieImage: {
    width: 170,
    padding: 10,
    margin: 10,
    height: 200,
    marginRight: 16,
    borderRadius: 3,
  },
  movieTitle: {
    justifyContent: 'space-between',
    padding: 10,
    alignContent:'space-between',
    fontSize: 16,
    fontWeight:'bold',
  },

});

export default NewMovieScreen;
