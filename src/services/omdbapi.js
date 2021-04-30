async function info() {
  const valor = "Star wars";
  const fetch = require("node-fetch");
  const respuesta = await fetch(
    "http://www.omdbapi.com/?t=" +
      encodeURIComponent(valor) +
      "&apikey=e1b085c9",
    {
      method: "GET",
    }
  );
  const resultado = await respuesta.json();

  return resultado;
}

const service = {
  info,
};

export default service;
