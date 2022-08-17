// import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import fetchImages from './moduls/fetchImages'


const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = '29231182-3aef70459dc4e66f5b04dc644';
const LOCALSTORAGE_KEY = "fetch_key_images";
let currentPage;
btnLoadMore.classList.add("is-hidden");



form.addEventListener('submit', onFormBtnSubmit);
btnLoadMore.addEventListener('click', onBtnLoadMore);


const afterFetch = async (url) => {
    try {
        // fetchImages(url);
        const responce = await axios.get(`${BASE_URL}?key=${API_KEY}&${url}`);
        console.log(responce.data.totalHits);
        const searchResult = responce.data.hits;
        const totalResults = responce.data.totalHits;
       
        const arrayResponse = Object.keys(searchResult);
        if (arrayResponse.length === 0) {
            notFoundImages();
        } else {
            insertGallery(searchResult);
            lightBox.refresh();
        }
        btnLoadMore.classList.remove("is-hidden");
        
        if (currentPage === 1) {
            Notiflix.Notify.success(`Hooray! We found ${totalResults} images.`);
        }

        const maxResult = Math.ceil(totalResults / 100);
    console.log(maxResult);

         if (maxResult === currentPage) {
        btnLoadMore.classList.add("is-hidden");
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    }
    catch {error => { 
        console.log(error);
    }
    }
};

function onFormBtnSubmit(e) {
    e.preventDefault();
    cleanerImageResult();
    currentPage = 1;
    const url = createUrl();
    afterFetch(url);

    // btnLoadMore.classList.remove("is-hidden");
   
//    if (responce.data.totalHits)
}

function onBtnLoadMore(e) {
    btnLoadMore.classList.add("is-hidden");
    currentPage += 1;
    const url = createUrl();
    // const fetchResult =
        afterFetch(url);
    // console.log(fetchResult.totalHits);
    // const maxResult = Math.ceil(fetchResult.totalHits / 100);
    // console.log(maxResult);
   
    btnLoadMore.classList.remove("is-hidden");

}

function createUrl() {
    const surchImages = form.elements.searchQuery.value;
    // updauteInput();
    const urlPart = `q=${surchImages}&image_type=photo&orientation=horizontal&safesearch=true&per_page=100&page=${currentPage}`;
    // saveFormValue();
    return urlPart;
}

// function saveFormValue(surchImages) {
//     localStorage.setItem(LOCALSTORAGE_KEY, surchImages);
// }

// function updauteInput(surchImages) {

//     const savedValue = localStorage.getItem(LOCALSTORAGE_KEY);

//     if (surchImages !== savedValue ) {
//         cleanerImageResult
//     }

    // parsedValue = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    
    // autoCompleteValue(parsedValue);
// }


function notFoundImages() {
    Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
}


function insertGallery(responce) {
    const galleryItem = createGallery(responce);
    gallery.insertAdjacentHTML('beforeend', galleryItem);
    // gallery.innerHTML = galleryItem;
};

function createGallery(galleryItems) {
    return galleryItems.map(galleryItem => createPhotoCard(galleryItem)).join('')
};
        
function createPhotoCard({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `
    <a class="gallery__item" href="${largeImageURL}">
    <div class="photo-card">
        
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        
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
    </a>
     `};



function cleanerImageResult() {
    gallery.innerHTML = "";
}

const lightBox = new SimpleLightbox('.gallery a');

