import express from "express";

const server = express();

const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log("Escuchando en http://localhost:" + port);
});