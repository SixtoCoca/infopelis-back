import cheerio from "cheerio";
import axios from "axios";

async function info(nombre) {
  //omdbapi
  var valor = "";
  if (nombre) {
    valor = nombre;
  } else {
    valor = "Star wars";
  }
  const fetch = require("node-fetch");
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
  console.log(id);

  //themoviedb
  const respuesta = await fetch(
    "https://api.themoviedb.org/3/find/" +
      encodeURIComponent(id) +
      "?api_key=c9d21503b5e68853b32db2f700cede87&external_source=imdb_id",

    {
      method: "GET",
    }
  );
  const resultado = await respuesta.json();
  let idThemovieDB = resultado.movie_results[0].idThemovieDB;

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

  console.log(movie.data.original_title);

  //Scrap
  //filmaffinity no imdb
  var titulo="";
  let url = "https://www.imdb.com/title/" + id + "/?ref_=rvi_tt";
  const web = async (url) => {
    const respuesta = await axios.get(url);
    const $ = cheerio.load(respuesta.data);
    titulo = $(".plot_summary").children().first().text();
    console.log(titulo);
  };

  await web(url);

  const clientes = {
    id: id,
    titulo: movie.data.original_title,
    resumen: titulo
  };
  return clientes;
}

const service = {
  info,
};

export default service;
