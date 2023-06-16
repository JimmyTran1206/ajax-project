// DOM querying
const $containerSeasonal = document.querySelector('div.container-seasonal');
const $seasonalLink = document.querySelector('li#seasonal-link');
const $containerPopular = document.querySelector('div.container-popular');
const $popularLink = document.querySelector('li#popular-link');
const $checkboxHamburger = document.querySelector('input#hamburger');
const $pageTitle = document.querySelector('h1.page-title');
const $containerError = document.querySelector('div.container-error');

// Fetching data using fetch api and Jikan api
const urlAnimeSeasonal = 'https://api.jikan.moe/v4/seasons/now';
const urlAnimeTopPopular = 'https://api.jikan.moe/v4/top/anime';

// fetching data for default view: Seasonal;
window.addEventListener('load', () => {
  fetchDisplay(urlAnimeSeasonal, $containerSeasonal);
});

//  handling click event for Seasonal link
$seasonalLink.addEventListener('click', event => {
  fetchDisplay(urlAnimeSeasonal, $containerSeasonal);
  showContainer($containerSeasonal);
  hideContainer($containerPopular);
  $pageTitle.innerText = 'SEASONAL';
  $checkboxHamburger.checked = false; // uncheck the checkbox in hamburger mode
});

// handling click event
$popularLink.addEventListener('click', event => {
  fetchDisplay(urlAnimeTopPopular, $containerPopular);
  showContainer($containerPopular);
  hideContainer($containerSeasonal);
  $pageTitle.innerText = 'POPULAR';
  $checkboxHamburger.checked = false; // uncheck the checkbox in hamburger mode
});

// show-hide container function
function showContainer($domContainer) {
  $domContainer.classList.remove('hidden');
}
function hideContainer($domeContainer) {
  $domeContainer.classList.add('hidden');
}
// fetch-display function for seasonal-popular animes
function fetchDisplay(url, $domElem) {
  $domElem.innerHTML = '';
  hideContainer($containerError);
  fetch(url, {})
    .then(response => response.json())
    .then(response => {
      response.data.forEach(item => {
        const $element = `<div class="content-box">
          <div class="content-item" id="${item.mal_id}">
            <div class="content-title">
              <h3 class="anime-title">${item.title}</h3>
            </div>
            <div class="content-image">
              <img class="anime-image" src="${item.images.jpg.image_url ? item.images.jpg.image_url : ''}" alt="Anime Image">
            </div>

          </div>
        </div>`;
        $domElem.insertAdjacentHTML('beforeend', $element);
      });
    })
    .catch(err => { errorHandler(err); });
}

function errorHandler(err) {
  if (err) {
    $pageTitle.innerText = 'ERRORS!';
    showContainer($containerError);
    hideContainer($containerPopular);
    hideContainer($containerSeasonal);
  }

}
