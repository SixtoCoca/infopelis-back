import cheerio from "cheerio";
import request from "request";

async function info(id) {
  var valor = "";
  if (id) {
    valor = id;
  } else {
    valor = "tt0076759";
  }
  //filmaffinity no imdb
  var url = "https://www.imdb.com/title/" + valor + "/?ref_=rvi_tt";
  request(url, (err, res, body) => {
    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(body);
      var titulo = "";
      titulo = $(".plot_summary");
      console.log(titulo.children().first().text());
      return titulo;
    }
  });


}

const service = {
  info,
};

export default service;
