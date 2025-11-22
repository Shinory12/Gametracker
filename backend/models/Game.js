import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  genero: String,
  plataforma: String,
  anio: Number,
  imagen: String
});

export default mongoose.model("Game", gameSchema);
