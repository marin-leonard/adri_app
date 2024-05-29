import { Text, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import genres from '../../genres.json';
import { Movie } from '../../api';

const API_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

interface MovieItemProps {
  movie: Movie;
};

const MovieItem = ({ movie }: MovieItemProps) => {
  const [dynamicHeight, setDynamicHeight] = useState<number>(0);
  const [source, setSource] = useState<{ width: number, height: number }>();

  const getSize = async () => {
    await Image.getSize(
      `${API_IMAGE_URL}${movie.poster_path}`,
      (width, height) => {
        setSource({ width, height });
      }
    );
  };

  useEffect(() => {
    if (movie.poster_path) getSize();
  }, []);

  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'blue', padding: 8, width: "100%", columnGap: 8 }}>
      {source && <View onLayout={(e) => dynamicHeight === 0 && setDynamicHeight(e.nativeEvent.layout.height)} style={{ backgroundColor: 'red', height: "100%" }}>
        <Image style={{ height: dynamicHeight, width: dynamicHeight * source.width / source.height, resizeMode: "center" }}
          source={{ uri: `${API_IMAGE_URL}${movie.poster_path}` }}
        />
      </View>}
      <View style={{ backgroundColor: 'green', flex: 1 }}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={{ fontWeight: "bold" }}>{movie.title}</Text>
        <View style={{ flexDirection: 'row', columnGap: 16 }}>
          <Text ellipsizeMode="tail" numberOfLines={1}>{movie.release_date}</Text>
          <Text ellipsizeMode="tail" numberOfLines={1}>{movie.vote_average}/10 ({movie.vote_count} notes)</Text>
        </View>

        <View style={{ flexDirection: 'row', columnGap: 8, overflow: "hidden" }}>
          {movie.genre_ids.map((genre, _index) => {
            const genreInfo = genres.find((value) => value.id === genre);

            return genreInfo &&
              <View style={{ backgroundColor: 'pink' }}>
                <Text>{genreInfo.name}</Text>
              </View>
          })}
        </View>
        <View>
          <Text ellipsizeMode="tail" numberOfLines={3}>{movie.overview}{"\n"}{"\n"}</Text>
        </View>
      </View>
    </View>
  );
};

export default MovieItem;
