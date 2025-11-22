import { useState } from "react";

function AddGame() {
  const [nombre, setNombre] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [anio, setAnio] = useState("");
  const [imagen, setImagen] = useState("");

  const guardar = async () => {
    const juego = { nombre, genero, plataforma, anio, imagen };

    const res = await fetch("http://localhost:4000/juegos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(juego),
    });

    if (res.ok) {
      alert("Juego guardado");
      setNombre("");
      setGenero("");
      setPlataforma("");
      setAnio("");
      setImagen("");
    }
  };

  return (
    <div>
      <h2>Agregar Juego</h2>
      <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input placeholder="Género" value={genero} onChange={(e) => setGenero(e.target.value)} />
      <input placeholder="Plataforma" value={plataforma} onChange={(e) => setPlataforma(e.target.value)} />
      <input placeholder="Año" value={anio} onChange={(e) => setAnio(e.target.value)} />
      <input placeholder="URL imagen" value={imagen} onChange={(e) => setImagen(e.target.value)} />

      <button onClick={guardar} style={{ marginTop: "15px", padding: "10px 25px" }}>
        Guardar
      </button>
    </div>
  );
}

export default AddGame;
