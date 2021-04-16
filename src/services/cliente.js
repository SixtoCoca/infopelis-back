function read(id) {
  const clientes = [
    { id: 1, nombre: 'Sixto', Apellidos: 'Coca Cruz' },
    { id: 2, nombre: 'Elena', Apellidos: 'Álvarez Sánchez' },
    { id: 3, nombre: 'Jesús', Apellidos: 'Cortés Alcaraz' }
  ];

  if (id) {
    return [clientes.find(cliente => cliente.id == id)];
  }

  return clientes;
}

const service = {
  read,
};

export default service;