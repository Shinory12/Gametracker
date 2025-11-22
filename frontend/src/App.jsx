import { useState, useEffect } from "react";
import AddGame from "./AddGame.jsx";

function App() {
  const [juegos, setJuegos] = useState([]);

  const obtenerJuegos = async () => {
    try {
      const res = await fetch("http://localhost:4000/juegos");
      if (!res.ok) throw new Error("Error al obtener juegos");
      const data = await res.json();
      setJuegos(data);
    } catch (error) {
      console.error("Error al obtener juegos:", error);
    }
  };

  useEffect(() => {
    obtenerJuegos();
  }, []);

  return (
    <div>
      <h1>Mis Juegos</h1>
      <AddGame onAgregar={obtenerJuegos} />
      <ul>
        {juegos.map((juego) => (
          <li key={juego._id}>
            <h3>{juego.nombre}</h3>
            <p>{juego.genero} - {juego.plataforma} - {juego.anio}</p>
            {juego.imagen && <img src={juego.imagen} alt={juego.nombre} width={100} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
