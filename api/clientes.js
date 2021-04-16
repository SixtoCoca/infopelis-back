import express from 'express';
//Creando el enroutador
const router= express.Router();

router.get('/', (req, res) => {
  const clientes = [
      { id: 1, nombre: 'Sixto', Apellidos: 'Coca Cruz' },
      { id: 2, nombre: 'Elena', Apellidos: 'Álvarez Sánchez' },
      { id: 3, nombre: 'Jesús', Apellidos: 'Cortés Alcaraz' }
  ];

  res.json(clientes);
});

export default router;