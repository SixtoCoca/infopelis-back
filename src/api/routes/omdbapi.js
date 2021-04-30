import express from "express";
import service from "../../services/omdbapi";

//Creando el enroutador
const router = express.Router();

router.get("", (req, res) => {
  const respuesta = service.info();
  respuesta.then((val) => {
    if (respuesta === "error") {
      res.status(500).send("error");
    } else {
      res.status(200).json(val);
    }

  });

});

export default router;
