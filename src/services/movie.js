import cheerio from "cheerio";
import axios from "axios";
import fetch from "node-fetch";
import database from "./db.js";
import MovieDB from "node-themoviedb";

async function info(nombre) {
  var valor = "";
  if (nombre) {
    valor = nombre;
  } else {
    valor = "Star Wars: Episode IV - A New Hope";
  }

  //Si esta en la base de datos
  const dbRef = database.ref();
  let inDb = false;
  let respuestaApi = {};
  await dbRef.child(valor).get().then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Dentro de la base de datos");
        inDb = true;
        respuestaApi = snapshot.val();
      } else {
        inDb = false;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  //omdbapi
  if (!inDb) {
    console.log("Fuera de la base de datos");
    const respuestaOMDB = await fetch(
      "http://www.omdbapi.com/?t=" +
        encodeURIComponent(valor) +
        "&apikey=e1b085c9",
      {
        method: "GET",
      }
    );
    const resultadoOMDB = await respuestaOMDB.json();
    if (resultadoOMDB.Response == "True") {
      let id = resultadoOMDB.imdbID;

      //themoviedb

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
      let url =
        "https://www.imdb.com/title/" +
        encodeURIComponent(id) +
        "/reviews?ref_=tt_urv";
      const web = async (url) => {
        const respuesta = await axios.get(url);
        const $ = cheerio.load(respuesta.data);
        reviews = $(".content");
      };

      await web(url);

      respuestaApi = {
        id: id,
        response: true,
        title: resultadoOMDB.Title,
        actors: resultadoOMDB.Actors,
        country: resultadoOMDB.Country,
        poster: resultadoOMDB.Poster,
        plot: resultadoOMDB.Plot,
        writer: resultadoOMDB.Writer,
        released: resultadoOMDB.Released,
        imdbRating: resultadoOMDB.imdbRating,
        production: movie.data.production_companies,
        homepage: movie.data.homepage,
        genres: movie.data.genres,
        providers: resultadoProviders.results.ES,
        review1: reviews.eq(0).children().first().text(),
        review2: reviews.eq(1).children().first().text(),
        review3: reviews.eq(2).children().first().text(),
      };
      database.ref(respuestaApi.title).set(respuestaApi);
    } else {
      respuestaApi = {
        response: false,
        error: "Movie not found!",
      };
    }
  }
  return respuestaApi;

}

const service = {
  info,
};

export default service;

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/8.6.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="/__/firebase/8.6.2/firebase-analytics.js"></script>

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>

*/
