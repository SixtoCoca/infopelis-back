// ES6 Style
// import MovieDB from 'node-themoviedb';
async function info(id) {
  var valor = "";
  if(id){
    valor = id;
  }else{
    valor = "tt0076759"
  }
  const fetch = require("node-fetch");
  const respuesta = await fetch(
    "https://api.themoviedb.org/3/find/" +
      encodeURIComponent(valor) +
      "?api_key=c9d21503b5e68853b32db2f700cede87&external_source=imdb_id",

    {
      method: "GET",
    }
  );
  const resultado = await respuesta.json();
  console.log(resultado);
  var id = resultado.movie_results[0].id;

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


  return movie;
}

const service = {
  info,
};

export default service;
