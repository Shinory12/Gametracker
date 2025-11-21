const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  juegoId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
  puntuacion: { type: Number, min: 1, max: 5, required: true },
  textoReseña: String,
  horasJugadas: { type: Number, default: 0 },
  dificultad: { type: String, enum: ['Fácil', 'Normal', 'Difícil'] },
  recomendaria: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: Date
});

module.exports = mongoose.model('Review', ReviewSchema);
