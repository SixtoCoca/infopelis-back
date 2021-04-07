const express= require('express');

const server = express();


server.use(express.static('public'));


const port = 8000;

server.listen(port, () => {
    console.log("Escuchando en http://localhost:" + port);
});