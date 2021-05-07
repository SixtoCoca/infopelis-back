import express from "express";
import cliente from "./routes/cliente";
import omdbapi from "./routes/omdbapi";
import moviedb from "./routes/moviedb";

//Creando el enrutador
const router = express.Router();

router.use("/cliente", cliente);
router.use("/omdb", omdbapi);
router.use("/moviedb", moviedb);

export default router;
