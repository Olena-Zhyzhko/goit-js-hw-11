import axios from 'axios';
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = '29231182-3aef70459dc4e66f5b04dc644';
const FILTERS = 'image_type=photo&orientation=horizontal&safesearch=true';
const PER_PAGE = 40;



const fetchImages = async (surchImages, currentPage) => {
    const responce = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${surchImages}&${FILTERS}&per_page=${PER_PAGE}&page=${currentPage}`);
    return responce.data;
}

export { fetchImages, PER_PAGE };