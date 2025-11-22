import express from "express";
import Juego from "../models/Juego.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const juegos = await Juego.find();
  res.json(juegos);
});

router.post("/", async (req, res) => {
  const nuevo = new Juego(req.body);
  await nuevo.save();
  res.json({ mensaje: "Juego guardado" });
});

export default router;
