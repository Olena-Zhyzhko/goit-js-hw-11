const gallery = document.querySelector('.gallery');

export default function insertGallery(response) {
    const galleryItem = createGallery(response);
    gallery.insertAdjacentHTML('beforeend', galleryItem);
};

function createGallery(galleryItems) {
    return galleryItems.map(galleryItem => createPhotoCard(galleryItem)).join('')
};
        
function createPhotoCard({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `
    <div class="photo-card">
        <a class="gallery__item" href="${largeImageURL}">
        <div class="photo__thumb">
            <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </div>
        <div class="info">
            <p class="info-item">
            <b>Likes </b> <br>
            <span class="statictics">${likes}</span>
            </p>
            <p class="info-item">
            <b>Views</b> <span class="statictics">${views}</span>
            </p>
            <p class="info-item">
            <b>Comments</b> <span class="statictics">${comments}</span>
            </p>
            <p class="info-item">
            <b>Downloads</b> <span class="statictics">${downloads}</span>
            </p>
        </div>
    </a>
    </div>
     `};
