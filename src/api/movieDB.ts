import axios from "axios";

export const movieDB = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",
  params: {
    api_key: process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY,
    language: "en-US",
  },
});
