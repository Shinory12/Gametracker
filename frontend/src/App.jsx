import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [juegos, setJuegos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [anio, setAnio] = useState("");
  const [imagen, setImagen] = useState("");

  // Cargar juegos desde MongoDB al iniciar
  useEffect(() => {
    fetch("http://localhost:4000/juegos")
      .then(res => res.json())
      .then(data => setJuegos(data))
      .catch(err => console.error("Error al cargar juegos:", err));
  }, []);

  // Agregar un nuevo juego a MongoDB
  const agregarJuego = async () => {
    if (!nombre || !genero) return alert("Por favor completa al menos nombre y género");

    const nuevoJuego = { nombre, genero, plataforma, anio, imagen };

    try {
      const res = await fetch("http://localhost:4000/juegos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoJuego),
      });

      const data = await res.json();
      setJuegos([...juegos, data]);

      // Limpiar inputs
      setNombre("");
      setGenero("");
      setPlataforma("");
      setAnio("");
      setImagen("");
    } catch (error) {
      console.error("Error al agregar juego:", error);
    }
  };

  return (
    <div className="app">
      <h1 className="titulo">
        🎮 Biblioteca de Juegos
      </h1>

      <div className="formulario">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Género"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
        <input
          type="text"
          placeholder="Plataforma"
          value={plataforma}
          onChange={(e) => setPlataforma(e.target.value)}
        />
        <input
          type="text"
          placeholder="Año"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL Imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />

        <button onClick={agregarJuego}>Agregar juego</button>
      </div>

      <div className="contenedor-juegos">
        {juegos.map((juego) => (
          <div className="tarjeta" key={juego._id}>
            {juego.imagen ? (
              <img src={juego.imagen} alt={juego.nombre} />
            ) : (
              <div className="sin-imagen">Sin imagen</div>
            )}
            <h2>{juego.nombre}</h2>
            <p>{juego.genero}</p>
            {juego.plataforma && <p><b>Plataforma:</b> {juego.plataforma}</p>}
            {juego.anio && <p><b>Año:</b> {juego.anio}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
