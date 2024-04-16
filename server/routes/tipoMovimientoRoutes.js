const express = require('express');
const router = express.Router();
const prisma = require('./prisma');

// Obtener los valores del enum TipoMovimiento
router.get('/', async (req, res) => {
    try {
      const tiposMovimiento = await prisma.$queryRaw('SELECT * FROM "TipoMovimiento"');
      res.json(tiposMovimiento);
    } catch (error) {
      console.error('Error al obtener los valores del enum TipoMovimiento:', error);
      res.status(500).send('Error interno del servidor');
    }
  });

module.exports = router;
