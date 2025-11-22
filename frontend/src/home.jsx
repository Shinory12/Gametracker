import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/juegos")
      .then(res => res.json())
      .then(data => setJuegos(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Juegos</h2>

      {juegos.map(j => (
        <div key={j._id} style={{ marginBottom: "20px" }}>
          <h3>{j.titulo}</h3>
          <p>Plataforma: {j.plataforma}</p>

          <Link to={`/game/${j._id}`}>Ver detalles</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
