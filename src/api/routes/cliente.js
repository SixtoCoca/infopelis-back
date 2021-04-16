import express from 'express';
import service from '../../services/cliente';

//Creando el enroutador
const router = express.Router();

router.get('/:id?', (req, res) => {
  const respuesta = service.read(
    req.params['id']
  );

  if (respuesta === 'error') {
    res.status(500).send('error');
  } else {
    res.status(200).json(respuesta);
  }
});

export default router;