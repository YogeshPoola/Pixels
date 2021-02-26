const auth = "563492ad6f91700001000001cf6a53440b9c40d397d90ac734c1f825";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-button");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let numberofcuratedPhotos = 16;
let pageNumber = 1;
let numberofsearchPhotos = 16;

searchInput.addEventListener("input", updateInput);

function updateInput(e) {
  searchValue = e.target.value;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

async function curatedPhotos() {
  let curatedURL = `https://api.pexels.com/v1/curated?page=${pageNumber}&per_page=${numberofcuratedPhotos}`;
  // clear();
  const dataFetch = await fetch(curatedURL, {
    method: "GET",
    headers: { Accept: "application/json", Authorization: auth },
  });
  const data = await dataFetch.json();

  data.photos.forEach((photo) => {
    const galleryImage = document.createElement("div");
    galleryImage.classList.add("gallery-image");
    galleryImage.innerHTML = `<img src=${photo.src.medium}></img> 
    <div class="gallery-info"><p>${photo.photographer}</p>
    <a href=${photo.src.original} target="_blank">Download</a></div>
    `;
    gallery.appendChild(galleryImage);
  });
}

curatedPhotos();

async function searchPhotos(query) {
  let searchURL = `https://api.pexels.com/v1/search?query=${query}&per_page=${numberofsearchPhotos}`;
  clear();
  const dataFetch = await fetch(searchURL, {
    method: "GET",
    headers: { Accept: "application/json", Authorization: auth },
  });
  const data = await dataFetch.json();

  data.photos.forEach((photo) => {
    const galleryImage = document.createElement("div");
    galleryImage.classList.add("gallery-image");
    galleryImage.innerHTML = `<img src=${photo.src.medium}></img> <div class="gallery-info"><p>${photo.photographer}</p>
    <a href=${photo.src.original} target="_blank">Download</a></div>`;
    gallery.appendChild(galleryImage);
  });
}

function clear() {
  gallery.innerHTML = "";
  searchInput.innerHTML = "";
}

more.addEventListener("click", morePhotos);

function morePhotos() {
  if (searchValue) {
    numberofsearchPhotos += 16;
    console.log(numberofsearchPhotos);
    console.log("more search");
    searchPhotos(searchValue);
  } else {
    pageNumber += 1;
    console.log(numberofcuratedPhotos);
    console.log(pageNumber);
    console.log("more");
    curatedPhotos();
  }
}
