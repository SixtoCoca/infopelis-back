import express from "express";
import movie from "./routes/movie";

//Creando el enrutador
const router = express.Router();

router.use("/movie", movie);  

export default router;
