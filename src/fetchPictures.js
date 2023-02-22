// const axios = require('axios');
import axios from "axios";

const ApiKey = '33796179-09372d9b13f9947ab69ebb690';

export let currentPage = 1;
export let totalPages = 0;
const PICTURES_IN_PAGE = 40;
let query = "";

function fetchPictures(newQuery) {
  if (newQuery !== query) {
    query = newQuery;
    currentPage = 1;
    totalPages = 0;
  }

  console.log("axios", axios);

  const url = `https://pixabay.com/api/?key=${ApiKey}&q=${newQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${PICTURES_IN_PAGE}`;
  return axios(url).then(response => {
    console.log('response', response);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    currentPage += 1;
    totalPages = Math.ceil(response.data.totalHits / PICTURES_IN_PAGE);
    return response.data.hits;
  });
}

export default fetchPictures;

