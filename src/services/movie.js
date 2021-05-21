import cheerio from "cheerio";
import axios from "axios";
import fetch from "node-fetch";

async function info(nombre) {
  //omdbapi
  var valor = "";
  if (nombre) {
    valor = nombre;
  } else {
    valor = "Star wars";
  }
  const respuestaOMDB = await fetch(
    "http://www.omdbapi.com/?t=" +
      encodeURIComponent(valor) +
      "&apikey=e1b085c9",
    {
      method: "GET",
    }
  );
  const resultadoOMDB = await respuestaOMDB.json();

  let id = resultadoOMDB.imdbID;

  //themoviedb


  const respuesta = await fetch(
    "https://api.themoviedb.org/3/find/" +
      encodeURIComponent(id) +
      "?api_key=c9d21503b5e68853b32db2f700cede87&external_source=imdb_id",

    {
      method: "GET",
    }
  );
  const resultadoThemoviedb = await respuesta.json();

  let idThemovieDB = resultadoThemoviedb.movie_results[0].idThemovieDB;

  const MovieDB = require("node-themoviedb");
  // ES6 Style
  // import MovieDB from 'node-themoviedb';
  const mdb = new MovieDB("c9d21503b5e68853b32db2f700cede87", "en-US");
  const args = {
    pathParameters: {
      movie_id: id,
    },
  };
  const movie = await mdb.movie.getDetails(args);

  const respuestaProviders = await fetch(
    "https://api.themoviedb.org/3/movie/" +
      encodeURIComponent(id) +
      "/watch/providers?api_key=c9d21503b5e68853b32db2f700cede87",

    {
      method: "GET",
    }
  );

  const resultadoProviders = await respuestaProviders.json();

  // https://api.themoviedb.org/3/movie/tt0076759/watch/providers?api_key=c9d21503b5e68853b32db2f700cede87
  //Scrap
  //filmaffinity no imdb
  var reviews = "";
  let url = "https://www.imdb.com/title/" + encodeURIComponent(id) + "/reviews?ref_=tt_urv";
  const web = async (url) => {
    const respuesta = await axios.get(url);
    const $ = cheerio.load(respuesta.data);
    reviews = $(".content");
  };

  await web(url);

  const clientes = {
    id: id,
    title: resultadoOMDB.Title,
    poster: resultadoOMDB.Poster,
    plot: resultadoOMDB.Plot,
    writer: respuestaOMDB.Writer,
    released: respuestaOMDB.Released,
    imdbRating: respuestaOMDB.imdbRating,
    production: movie.data.production_companies,
    homepage: movie.data.homepage,
    genres: movie.data.genres,
    providers: resultadoProviders.results.ES,
    review1: reviews.eq(0).children().first().text(),
    review2: reviews.eq(1).children().first().text(),
    review3: reviews.eq(2).children().first().text(),
  };
  return clientes;
}

const service = {
  info,
};

export default service;
