import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Ruta de órdenes del usuario');
});

export default router;