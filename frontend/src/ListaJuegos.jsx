import { useEffect, useState } from "react";

function ListaJuegos() {
  const [juegos, setJuegos] = useState([]);

  const obtener = async () => {
    const res = await fetch("http://localhost:4000/juegos");
    const data = await res.json();
    setJuegos(data);
  };

  useEffect(() => {
    obtener();
  }, []);

  return (
    <div>
      <h2>Lista de Juegos</h2>
      {juegos.map((j, i) => (
        <div key={i} style={{ marginBottom: "20px", background: "#1e2a3d", padding: "15px", borderRadius: "10px" }}>
          <h3>{j.nombre}</h3>
          <p>{j.genero} – {j.plataforma} – {j.anio}</p>
          {j.imagen && <img src={j.imagen} width="120" />}
        </div>
      ))}
    </div>
  );
}

export default ListaJuegos;
