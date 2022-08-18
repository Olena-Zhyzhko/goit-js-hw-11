 function checkResult(responceData) {
        const searchResult = responceData.hits;
        const totalResults = responceData.totalHits;
        const maxResult = Math.ceil(totalResults / perPage);

        const arrayResponse = Object.keys(searchResult);
        if (arrayResponse.length === 0) {
            notFoundImages();
        } else if (maxResult === currentPage) {
        btnLoadMore.classList.add("is-hidden");
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        } else {
            insertGallery(searchResult);
            lightBox.refresh();
            btnLoadMore.classList.remove("is-hidden");
        }
}

export default checkResult;
