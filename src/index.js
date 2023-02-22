import Notiflix from 'notiflix';
import fetchPictures, { currentPage, totalPages } from './fetchPictures';

const formEl = document.querySelector(".search-form");
const inputEl = document.querySelector('[name="searchQuery"]');
const searchBtn = document.querySelector('.button-submit');
const galleryEl = document.querySelector('.gallery');
const moreBtn = document.querySelector('.load-more');

formEl.addEventListener("submit", onSearch);
moreBtn.addEventListener("click", onMoreButton);
moreBtn.style.display = "none";

function onSearch(event) {
  event.preventDefault();

  clear();  
  loadPictures();  
}

async function loadPictures() {
  const value = inputEl.value.trim();

  if (value === "") {
    // clear();
    Notiflix.Notify.failure(`Please check your input line`);
    return;
  }

  try {
    const newPictures = await fetchPictures(value);
    // console.log("pictures", pictures);
    createMarkup(newPictures);
    checkLastPage(newPictures);

  } catch (error) {
    onError(error);
  }
}

function onError(error) {
  console.log("error", error);
  // clear();
}

function createMarkup(pictures) {
  if (pictures.length === 0) {
    Notiflix.Notify.failure(`Sorry, there are no images matching your search query.Please try again.`);
  }
  const picturesItems = pictures.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
    return `
    <div class="photo-card">
      <img src=${webformatURL} alt=${tags} loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span>${views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <span>${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <span>${downloads}</span>
        </p>
      </div>
    </div>`
  });

  galleryEl.insertAdjacentHTML("beforeend", picturesItems.join(""));
}

function checkLastPage(pictures) {
  // console.log("currentPage", currentPage);
  // console.log("totalPages", totalPages);
  if (currentPage > totalPages) {
    moreBtn.style.display = "none";
    if (pictures.length > 0) {
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }
  } else {
    moreBtn.style.display = "block";
  }
}

function onMoreButton() {
  loadPictures();
}

function clear() {
  galleryEl.innerHTML = "";
};
