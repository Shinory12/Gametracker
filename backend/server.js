import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Conectar MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/juegosdb")
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

// Modelo
const JuegoSchema = new mongoose.Schema({
  nombre: String,
  genero: String,
  plataforma: String,
  anio: Number,
  imagen: String,
});

const Juego = mongoose.model("Juego", JuegoSchema);

// Rutas
app.get("/juegos", async (req, res) => {
  const juegos = await Juego.find();
  res.json(juegos);
});

app.post("/juegos", async (req, res) => {
  const nuevo = new Juego(req.body);
  await nuevo.save();
  res.json(nuevo);
});

// Iniciar backend
app.listen(4000, () => {
  console.log("Servidor backend corriendo en http://localhost:4000");
});
