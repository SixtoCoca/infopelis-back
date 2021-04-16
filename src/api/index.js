import express from 'express';
import cliente from './routes/cliente';

//Creando el enrutador
const router = express.Router();

router.use('/cliente', cliente)

export default router;

