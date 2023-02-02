import { formEl, buttonLoadMore } from './refs';
import { getPhotos, resetPages, resetCounter, getCounter } from './api';
import { getmarkup } from './markup';
import { getGallery, resetGallery, buttonIsHidden, getCheck } from './utils';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'simplelightbox/dist/simple-lightbox.min.js';
import Notiflix from 'notiflix';

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
let search = '';
formEl.addEventListener('submit', async e => {
  e.preventDefault();
  buttonLoadMore.classList.add('isHidden');
  search = formEl.searchQuery.value;
  resetPages();
  resetCounter();
  resetGallery();

  try {
    let photos = await getPhotos(search);

    if (!photos.photos.totalHits) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notiflix.Notify.success(
      `Hooray! We found ${photos.photos.totalHits} images.`
    );

    getCounter(photos.page, photos.photos.totalHits);
    let markup = getmarkup(photos.photos);
    getGallery(markup);
    lightbox.refresh();

    buttonLoadMore.classList.remove('isHidden');
  } catch (error) {
    console.log(error.message);
  }
});
buttonLoadMore.addEventListener('click', async () => {
  try {
    photos = await getPhotos(search);
    let photoIsFinished = getCounter(photos.page, photos.photos.totalHits);
    buttonIsHidden(photoIsFinished);
    markup = getmarkup(photos.photos);
    getGallery(markup);

    lightbox.refresh();
  } catch (error) {
    console.log(error.message);
  }
});

// window.addEventListener('scroll', () => {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// });
