import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import MovieItem from './src/components/MovieItem';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Movie } from './api';

const API_TOKEN = "537f615110d7295e1583d577f77c45cc";
const API_URL = "https://api.themoviedb.org/3/";

export default function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<Array<Movie>>([]);

  const fetchSearch = async () => {
    const response = await fetch(`${API_URL}/search/movie?query=${search}&api_key=${API_TOKEN}`, { method: "GET" })
    const json = await response.json();
    setMovies(json.results);
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#333333' }} contentContainerStyle={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }} >Ptite App</Text>
      <View style={{ flexDirection: "row", width: "100%", columnGap: 16, alignItems: "center" }}>
        <View style={{ flex: 1, backgroundColor: '#666666' }}>
          <TextInput
            placeholder='Rechercher un film'
            onChange={(e) => { setSearch(e.nativeEvent.text) }}
            onSubmitEditing={() => fetchSearch()}
          />
        </View>
        <TouchableOpacity onPress={fetchSearch}>
          <Text style={{ fontSize: 20 }}>🔎</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 24 }} />
      <View style={{ rowGap: 16 }}>
        {movies.map((movie, index) => <MovieItem key={`${movie.id}`} movie={movie} />)}
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#333333',
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

/*


  "center":         ...AB...     ....ABC....
  "space-between":  A......B     A....B....C
  "space-around":   ..A..B..     ..A..B..C..


  nombre === 8
  nombre < 9

  if (X) { Y }
  X && Y

  if (X) { Y } else { Z }
  X ? Y : Z


*/