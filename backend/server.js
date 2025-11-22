import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Game from "./models/Game.js";

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/gametracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error MongoDB:", err));

// Rutas
app.get("/juegos", async (req, res) => {
  try {
    const juegos = await Game.find();
    res.json(juegos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener juegos" });
  }
});

app.post("/juegos", async (req, res) => {
  const { nombre, genero, plataforma, anio, imagen } = req.body;

  // Validaciones
  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  try {
    const juego = new Game({
      nombre,
      genero,
      plataforma,
      anio: anio ? Number(anio) : undefined,
      imagen
    });
    await juego.save();
    res.status(201).json(juego);
  } catch (error) {
    console.error(error); // Esto muestra el error real en la terminal
    res.status(500).json({ error: "Error al guardar el juego" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
