import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages, PER_PAGE } from './modules/fetchImages';
import insertGallery from './modules/createGallery';


const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let currentPage = 1;
let searchWord = "";

form.addEventListener('submit', onFormBtnSubmit);
btnLoadMore.addEventListener('click', onBtnLoadMore);

function onFormBtnSubmit(e) {
    e.preventDefault();
    searchWord = form.elements.searchQuery.value;
    if (searchWord === '') {
        return;
    }
    btnLoadMore.classList.add("is-hidden");
    cleanerImageResult();
    searchImages();
}

function onBtnLoadMore() {
    btnLoadMore.classList.add("is-hidden");
    currentPage += 1;
    searchImages();
}


async function searchImages() {
    try {
        const responseData = await fetchImages(currentPage, searchWord);
        handleResult(responseData);
    }
    catch {error => { 
        console.log(error);
    }
    }
};


function handleResult(responseData) {
        const searchResult = responseData.hits;
        const totalResults = responseData.totalHits;
        const maxPage = Math.ceil(totalResults / PER_PAGE);

        if (searchResult.length === 0) {
            notFoundImages();
        } else {
            if (currentPage === 1) {
                sumOfFoundImages(totalResults);
            }

            insertGallery(searchResult);
            lightBox.refresh();
            btnLoadMore.classList.remove("is-hidden");
        }
    
        if (maxPage === currentPage) {
            btnLoadMore.classList.add("is-hidden");
            endOfSearchResults();
        }
}

function notFoundImages() {
    Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
}

function sumOfFoundImages(totalResults) {
    Notiflix.Notify.success(`Hooray! We found ${totalResults} images.`);
}

function endOfSearchResults() {
         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}


function cleanerImageResult() {
    gallery.innerHTML = "";
}

const lightBox = new SimpleLightbox('.gallery a');