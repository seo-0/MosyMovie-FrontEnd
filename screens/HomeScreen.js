import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreSelect = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleConfirm = async () => {
    try {
      const genreString = selectedGenres.join(',');      
      const response = await axios.post('http://152.67.204.227:8080/selectGenre', {
        preferMovie: genreString,
        userID: '1',
      });
      console.log('선호 장르 보내기에 성공! :', genreString);
    } catch (error) {
      console.log('선호 장르 보내기 실패ㅠㅠ.. :', error);
    }
  };

 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>《 Welcome to be in MosyMovie! 》</Text>
      <Text style={styles.title1}>좋아하는 영화 장르를 선택하세요!</Text>
      <TouchableOpacity
        style={[styles.genreButton, selectedGenres.includes('Animation') && styles.selectedGenreButton]}
        onPress={() => handleGenreSelect('Animation')}
      >
        <Text style={[styles.genreButtonText, selectedGenres.includes('Animation') && styles.selectedGenreButtonText]}>
          Animation
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.genreButton, selectedGenres.includes('Romance') && styles.selectedGenreButton]}
        onPress={() => handleGenreSelect('Romance')}
      >
        <Text style={[styles.genreButtonText, selectedGenres.includes('Romance') && styles.selectedGenreButtonText]}>
          Romance
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.genreButton, selectedGenres.includes('Comedy') && styles.selectedGenreButton]}
        onPress={() => handleGenreSelect('Comedy')}
      >
        <Text style={[styles.genreButtonText, selectedGenres.includes('Comedy') && styles.selectedGenreButtonText]}>
          Comedy
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.genreButton, selectedGenres.includes('Fantasy') && styles.selectedGenreButton]}
        onPress={() => handleGenreSelect('Fantasy')}
      >
        <Text style={[styles.genreButtonText, selectedGenres.includes('Fantasy') && styles.selectedGenreButtonText]}>
          Fantasy
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.genreButton, selectedGenres.includes('Adventure') && styles.selectedGenreButton]}
        onPress={() => handleGenreSelect('Adventure')}
      >
        <Text style={[styles.genreButtonText, selectedGenres.includes('Adventure') && styles.selectedGenreButtonText]}>
          Adventure
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.genreButton, selectedGenres.includes('Horror') && styles.selectedGenreButton]}
        onPress={() => handleGenreSelect('Horror')}
      >
        <Text style={[styles.genreButtonText, selectedGenres.includes('Horror') && styles.selectedGenreButtonText]}>
          Horror
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.genreButton, selectedGenres.includes('Thriller') && styles.selectedGenreButton]}
        onPress={() => handleGenreSelect('Thriller')}
      >
        <Text style={[styles.genreButtonText, selectedGenres.includes('Thriller') && styles.selectedGenreButtonText]}>
          Thriller
        </Text>
      </TouchableOpacity><TouchableOpacity
        style={[styles.genreButton, selectedGenres.includes('Mystery') && styles.selectedGenreButton]}
        onPress={() => handleGenreSelect('Mystery')}
      >
        <Text style={[styles.genreButtonText, selectedGenres.includes('Mystery') && styles.selectedGenreButtonText]}>
          Mystery
        </Text>
      </TouchableOpacity><TouchableOpacity
        style={[styles.genreButton, selectedGenres.includes('ScienceFiction') && styles.selectedGenreButton]}
        onPress={() => handleGenreSelect('ScienceFiction')}
      >
        <Text style={[styles.genreButtonText, selectedGenres.includes('ScienceFiction') && styles.selectedGenreButtonText]}>
          ScienceFiction
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.genreButton, selectedGenres.includes('Action') && styles.selectedGenreButton]}
        onPress={() => handleGenreSelect('Action')}
      >
        <Text style={[styles.genreButtonText, selectedGenres.includes('Action') && styles.selectedGenreButtonText]}>
          Action
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>확인</Text>
      </TouchableOpacity>
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
    color: '#00008B', 
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  title1: {
    color: '#FF1493', 
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  genreButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  genreButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  selectedGenreButton: {
    backgroundColor: '#DA70D6',
  },
  selectedGenreButtonText: {
    color: 'white',
  },
  confirmButton: {
    backgroundColor: '#0000CD',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomeScreen;
