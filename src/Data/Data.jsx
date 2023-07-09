import axios from 'axios';

const KEY_API = '36110571-62566cb2b6a4fab0c8087888a';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(query, numberOfPage) {
  const params = new URLSearchParams({
    key: KEY_API,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: numberOfPage,
    per_page: 12,
  });

  const { data } = await axios.get(BASE_URL, { params });
  return data;
}

export default fetchImages;
