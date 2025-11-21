import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import juegosRoutes from "./routes/games.js"; // 👈 importa tus rutas

dotenv.config();

const app = express();

// 🟢 CORS: permite conexión desde el frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🟢 Conexión con MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));

// 🟢 Registrar las rutas
app.use("/api/juegos", juegosRoutes); // 👈 aquí montas las rutas

// 🟢 Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`)
);
