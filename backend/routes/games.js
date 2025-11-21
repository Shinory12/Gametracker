import express from "express";
const router = express.Router();

// 🔹 Datos simulados (en memoria)
let juegos = [
  { id: 1, nombre: "GTA V", genero: "Acción" },
  { id: 2, nombre: "Minecraft", genero: "Aventura" },
  { id: 3, nombre: "The Witcher 3", genero: "RPG" },
];

// ✅ Ruta de prueba
router.get("/test", (req, res) => {
  res.json(juegos);
});

// ✅ Ruta para obtener todos los juegos
router.get("/", (req, res) => {
  res.json(juegos);
});

// ✅ Ruta para agregar un nuevo juego
router.post("/", (req, res) => {
  const { nombre, genero, plataforma, anio, imagen } = req.body;

  if (!nombre || !genero) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const nuevoJuego = {
    id: juegos.length + 1,
    nombre,
    genero,
    plataforma,
    anio,
    imagen,
  };

  juegos.push(nuevoJuego);
  console.log("🟢 Juego agregado:", nuevoJuego);
  res.json(nuevoJuego);
});

export default router;
