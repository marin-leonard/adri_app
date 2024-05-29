export interface Movie {
  poster_path: string;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  id: number;
  title: string;
  vote_count: number;
  vote_average: number;
}