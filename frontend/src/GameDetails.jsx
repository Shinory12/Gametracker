import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function GameDetails() {
  const { id } = useParams();
  const [juego, setJuego] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    cargarJuego();
    cargarReviews();
  }, []);

  async function cargarJuego() {
    const res = await fetch(`http://localhost:4000/juegos/${id}`);
    const data = await res.json();
    setJuego(data);
  }

  async function cargarReviews() {
    const res = await fetch(`http://localhost:4000/reviews/${id}`);
    const data = await res.json();
    setReviews(data);
  }

  async function enviarReview() {
    await fetch("http://localhost:4000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId: id, nombre, comentario, rating })
    });

    setNombre("");
    setComentario("");
    setRating(5);
    cargarReviews();
  }

  if (!juego) return <h2>Cargando...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{juego.titulo}</h2>
      <p><b>Plataforma:</b> {juego.plataforma}</p>
      <p><b>Descripción:</b> {juego.descripcion}</p>

      <Link to="/">Volver</Link>
      <hr />

      <h3>Reseñas</h3>

      {reviews.map((r, i) => (
        <div key={i} style={{ background: "#eee", padding: "10px", margin: "10px 0" }}>
          <b>{r.nombre}</b> — ⭐ {r.rating}
          <p>{r.comentario}</p>
        </div>
      ))}

      <hr />

      <h3>Agregar reseña</h3>

      <input
        placeholder="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      /><br /><br />

      <textarea
        placeholder="Comentario"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      /><br /><br />

      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      /><br /><br />

      <button onClick={enviarReview}>Enviar</button>
    </div>
  );
}

export default GameDetails;
