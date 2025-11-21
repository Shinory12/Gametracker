const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

router.get('/', async (req, res) => {
  const reviews = await Review.find().sort({ fechaCreacion: -1 });
  res.json(reviews);
});

router.get('/juego/:juegoId', async (req, res) => {
  const reviews = await Review.find({ juegoId: req.params.juegoId });
  res.json(reviews);
});

router.post('/', async (req, res) => {
  const r = new Review(req.body);
  const saved = await r.save();
  res.status(201).json(saved);
});

router.put('/:id', async (req, res) => {
  req.body.fechaActualizacion = Date.now();
  const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Reseña no encontrada' });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const deleted = await Review.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Reseña no encontrada' });
  res.json({ message: 'Reseña eliminada' });
});

module.exports = router;
