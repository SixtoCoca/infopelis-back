import express from 'express';
import api from './api';
import cors from 'cors';

const server = express();

//Para que no nos de problemas de cors
server.use(cors());
//Usamos el enroutador
server.use('/api', api);

const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Escuchando en http://localhost:${port}`);
});