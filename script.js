const movieselect = document.getElementById("movie");
const button = document.getElementById("submit");
const moviecontainer = document.getElementById("moviecontainer")
let movieID = 155;

function clearData(){
  while (moviecontainer.firstChild) {
    moviecontainer.removeChild(moviecontainer.firstChild);
  }
}

function getmovie(id){
  axios.get(`https:api.themoviedb.org/3/movie/${id}`, {
        params:{
        api_key: "dd0cae472f29b3a03f6bddb5090875f0",
        append_to_response: "videos",
        }
      }
    ).then((movieData) => {
      console.log(movieData);
      const img = document.createElement('img');
      const p = document.createElement('p');
      const iframe = document.createElement('iframe');

      const trailers = movieData.data.videos.results.filter((trailer) => trailer.type === "Trailer");
      iframe.src = `https:www.youtube.com/embed/${trailers.at(0).key}`;
      img.src = `https:image.tmdb.org/t/p/w500${movieData.data.poster_path}`;
      p.innerHTML = `${movieData.data.title} -- ${movieData.data.release_date} -- ${movieData.data.popularity}`;

      moviecontainer.append(p);
      moviecontainer.append(img);
      moviecontainer.append(iframe);
    }
)};

movieselect.addEventListener("click", () => {
  if(button.click){
    movieID = movieselect.value;
  }
})

button.addEventListener("click", () => {
  if(button.click){
    clearData();
    getmovie(movieID);
  }
})
