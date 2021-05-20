import express from "express";
import cliente from "./routes/cliente";
import movie from "./routes/movie";
import moviedb from "./routes/moviedb";
import scrap from "./routes/scrap";

//Creando el enrutador
const router = express.Router();

router.use("/cliente", cliente);
router.use("/movie", movie);
router.use("/moviedb", moviedb);
router.use("/scrap", scrap);

export default router;
