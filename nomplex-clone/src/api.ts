const API_KEY = '9e39572c8a9c0ba24d9f4036ca4ee14e';

const BASE_PATH = 'https://api.themoviedb.org/3';

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}
