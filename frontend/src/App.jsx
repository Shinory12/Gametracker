import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [juegos, setJuegos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [anio, setAnio] = useState("");
  const [imagen, setImagen] = useState("");

  // Cargar juegos
  const cargarJuegos = async () => {
    try {
      const res = await fetch("http://localhost:4000/juegos");
      const data = await res.json();
      setJuegos(data);
    } catch (err) {
      console.error("Error al cargar juegos:", err);
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  // Agregar juego
  const agregarJuego = async () => {
    const nuevoJuego = {
      nombre,
      genero,
      plataforma,
      anio,
      imagen,
    };

    try {
      const res = await fetch("http://localhost:4000/juegos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoJuego),
      });

      const data = await res.json();
      setJuegos([...juegos, data]);

      // limpiar
      setNombre("");
      setGenero("");
      setPlataforma("");
      setAnio("");
      setImagen("");
    } catch (err) {
      console.error("Error al agregar juego:", err);
    }
  };

  return (
    <div className="App">
      <h1>Biblioteca de Juegos</h1>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        placeholder="Género"
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
      />

      <input
        placeholder="Plataforma"
        value={plataforma}
        onChange={(e) => setPlataforma(e.target.value)}
      />

      <input
        placeholder="Año"
        value={anio}
        onChange={(e) => setAnio(e.target.value)}
      />

      <input
        placeholder="Imagen (base64)"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
      />

      <button onClick={agregarJuego}>Agregar juego</button>

      <div style={{ marginTop: "20px" }}>
        {juegos.map((j) => (
          <div key={j._id} style={{ marginBottom: "10px" }}>
            <b>{j.nombre}</b> - {j.genero} - {j.plataforma} - {j.anio}
            <br />
            <img src={j.imagen} alt="" width="100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
