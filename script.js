const currentYear = new Date().getFullYear();
const startDate = `${currentYear}-01-01`;
const endDate = `${currentYear}-12-31`;
const API_URL = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&api_key=d54294949aa5059e9f467e7dcab4ffe6`;
const IMAGE_URL = `https://image.tmdb.org/t/p/w500`;

const moviesDiv = document.querySelector(".content");

getMovies(API_URL);
async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();

  data.results.forEach((movie) => {
    const { title, poster_path, vote_average, overview, original_language } =
      movie;
    const code = `
    <div class="card">
        <div style="position: relative">
          <img style="width: 100%;" src="${IMAGE_URL + poster_path}" />
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

//release_date: "2022-07-27", overview
