import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// Obtener reseñas por juego
router.get("/:juegoId", async (req, res) => {
  try {
    const reviews = await Review.find({ juegoId: req.params.juegoId }).sort({ fecha: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reseñas" });
  }
});

// Crear reseña nueva
router.post("/", async (req, res) => {
  try {
    const nueva = new Review(req.body);
    await nueva.save();
    res.json({ mensaje: "Reseña creada", review: nueva });
  } catch (error) {
    res.status(500).json({ error: "Error al crear reseña" });
  }
});

export default router;
