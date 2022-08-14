// import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('#search-form');
// const inputEl = document.querySelector('')
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const URL = "https://pixabay.com/api/";
const API_KEY = '29231182-3aef70459dc4e66f5b04dc644';


form.addEventListener('submit', onFormBtnSubmit);


const fetchPhoto = async (surchImages) => {
    try {
        const responce = await axios.get(`${URL}?key=${API_KEY}&q=${surchImages}&image_type=photo&orientation=horizontal&safesearch=true`);
        // console.log(responce);
        insertGallery(responce.data);
        lightBox.refresh();

    }
    catch {error => { 
        console.log(error)
    }
    }
}

function onFormBtnSubmit(e) {
    e.preventDefault();
    const surchImages = form.elements.searchQuery.value;
    // console.log(surchImages);
    fetchPhoto(surchImages)

}

// function notFoundImages(responce) {
//     const arrayResponse = Object.keys(responce)
//     if (arrayResponse.length === 0) {
//         Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
//     }
// }


function createGallery(galleryItems) {
    return galleryItems.map(galleryItem => createPhotoCard(galleryItem)).join('')
};
        
function createPhotoCard({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `
    <div class="photo-card">
        <a class="gallery__item" href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
            <p class="info-item">
            <b>Likes </b> ${likes}
            </p>
            <p class="info-item">
            <b>Views</b> ${views}
            </p>
            <p class="info-item">
            <b>Comments</b> ${comments}
            </p>
            <p class="info-item">
            <b>Downloads</b> ${downloads}
            </p>
        </div>
</div>
     `};

function insertGallery(responce) {
    const galleryItem = createGallery(responce.hits);
    return gallery.insertAdjacentHTML('beforeend', galleryItem);
};

const lightBox = new SimpleLightbox('.gallery a');

