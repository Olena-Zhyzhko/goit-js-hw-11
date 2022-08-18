// import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import fetchImages from './moduls/fetchImages';
import insertGallery from './moduls/createGallery';


const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let currentPage;
const perPage = 40;
btnLoadMore.classList.add("is-hidden");



form.addEventListener('submit', onFormBtnSubmit);
btnLoadMore.addEventListener('click', onBtnLoadMore);

function onFormBtnSubmit(e) {
    e.preventDefault();
    cleanerImageResult();
    currentPage = 1;
    afterFetch(createUrl(), currentPage);
}

function onBtnLoadMore() {
    btnLoadMore.classList.add("is-hidden");
    currentPage += 1;
    afterFetch(createUrl(), currentPage);
    btnLoadMore.classList.remove("is-hidden");
}

async function afterFetch(surchImages, currentPage) {
    try {
        const responceData = await fetchImages(surchImages, currentPage);
        checkResult(responceData, currentPage);
    }
    catch {error => { 
        console.log(error);
    }
    }
};

function createUrl() {
    const surchImages = form.elements.searchQuery.value;
    return surchImages;
}


function checkResult(responceData, currentPage) {
        const searchResult = responceData.hits;
        const totalResults = responceData.totalHits;
        const maxResult = Math.ceil(totalResults / perPage);

        const arrayResponse = Object.keys(searchResult);
        if (arrayResponse.length === 0) {
            notFoundImages();
        } else {
            if (currentPage === 1) {
            Notiflix.Notify.success(`Hooray! We found ${totalResults} images.`);
            }

            insertGallery(searchResult);
            lightBox.refresh();
            btnLoadMore.classList.remove("is-hidden");
        }
    
        if (maxResult === currentPage) {
            btnLoadMore.classList.add("is-hidden");
         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }
}

function notFoundImages() {
    Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
}

function cleanerImageResult() {
    gallery.innerHTML = "";
}

const lightBox = new SimpleLightbox('.gallery a');

