import { useState } from "react";

function AddGame({ onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [anio, setAnio] = useState("");
  const [imagen, setImagen] = useState("");

  const guardar = async () => {
    if (!nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    const nuevoJuego = { 
      nombre, 
      genero, 
      plataforma, 
      anio: anio ? Number(anio) : undefined, 
      imagen 
    };

    console.log("Enviando juego:", nuevoJuego);

    try {
      const res = await fetch("http://localhost:4000/juegos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoJuego),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar el juego");
      }

      // Limpiar inputs
      setNombre("");
      setGenero("");
      setPlataforma("");
      setAnio("");
      setImagen("");

      onAgregar();
    } catch (error) {
      console.error("Error guardando:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Agregar Juego</h2>
      <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input type="text" placeholder="Género" value={genero} onChange={e => setGenero(e.target.value)} />
      <input type="text" placeholder="Plataforma" value={plataforma} onChange={e => setPlataforma(e.target.value)} />
      <input type="number" placeholder="Año" value={anio} onChange={e => setAnio(e.target.value)} />
      <input type="text" placeholder="URL imagen" value={imagen} onChange={e => setImagen(e.target.value)} />
      <button onClick={guardar}>Guardar</button>
    </div>
  );
}

export default AddGame;
