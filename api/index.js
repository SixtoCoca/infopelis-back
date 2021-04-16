import express from 'express';
import clientes from './clientes';
//Creando el enrutador
const router= express.Router();

//
router.use('/clientes',clientes)

export default router;

