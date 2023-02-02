const BASE_URL = 'https://pixabay.com/api/';
const KEY = 'key=33294397-381f15b78d88cb787350f045d';
let page = 0;
let counter = 0;

function resetPages() {
  return (page = 0);
}

function resetCounter() {
  return (counter = 0);
}

function getCounter(page, totalHits) {
  counter = 40 * page;
  if (counter >= totalHits) {
    return true;
  }
}

async function getPhotos(name) {
  page += 1;

  const photosFetch = await fetch(
    `${BASE_URL}?${KEY}&q=${name}&per_page=40&&page=${page}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  const photos = await photosFetch.json();
  return { photos, page };
}

export { getPhotos, resetPages, resetCounter, getCounter };
