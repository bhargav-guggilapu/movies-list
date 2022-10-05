const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "&api_key=d54294949aa5059e9f467e7dcab4ffe6";
const IMAGE_URL = `https://image.tmdb.org/t/p/w500`;

const moviesDiv = document.querySelector(".content");
const yearsEle = document.getElementById("years");

getMovies(new Date().getFullYear());

async function getMovies(year) {
  const YEAR_MOVIES_URL = `/discover/movie?primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31`;

  moviesDiv.innerHTML = "";

  const response = await fetch(API_URL + YEAR_MOVIES_URL + API_KEY);
  const data = await response.json();
  const movies = data.results;

  movies.sort(function (a, b) {
    return new Date(b.release_date) - new Date(a.release_date);
  });

  movies.forEach((movie) => {
    const {
      title,
      poster_path,
      vote_average,
      original_language,
      release_date,
    } = movie;
    const code = `
    <div class="card">
        <div style="position: relative">
          <div style="position: relative; overflow: hidden">
            <span class="trailer"><a class="trailer-link" target=”_blank” href="https://www.youtube.com/results?search_query=${title}+trailer">Watch Trailer</a></span>
            <img style="width: 100%;" src="${IMAGE_URL + poster_path}" />
            <span class="release-date">${release_date}</span>
          </div>
          <div class="card-footer">
            <h3 style="font-size: 15px">${title.toUpperCase()}</h3>
            <span class="rating">${vote_average.toFixed(1)}</span>
          </div>
          <span class="language">${original_language.toUpperCase()}</span>
        </div>
    </div>`;

    moviesDiv.innerHTML += code;
  });
}

yearsEle.addEventListener("change", function () {
  getMovies(this.value);
});

window.onload = function () {
  const currentYear = new Date().getFullYear();

  for (var i = currentYear; i >= 2000; i--) {
    var option = document.createElement("OPTION");
    option.innerHTML = i;
    option.value = i;
    yearsEle.appendChild(option);
  }
};
