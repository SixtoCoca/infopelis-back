import express from "express";
import cliente from "./routes/cliente";
import omdbapi from "./routes/omdbapi";

//Creando el enrutador
const router = express.Router();

router.use("/cliente", cliente);
router.use("/omdb", omdbapi);

export default router;
