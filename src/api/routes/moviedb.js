import express from "express";
import service from "../../services/moviedb";

//Creando el enroutador
const router = express.Router();

router.get("/:id?", (req, res) => {
  const respuesta = service.info(req.params["id"]);

  respuesta.then((val) => {
    if (respuesta === "error") {
      res.status(500).send("error");
    } else {
      res.status(200).json(val);
    }
  });
});

export default router;
