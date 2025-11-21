import { useState, useEffect } from "react";
import axios from "axios";

function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [nuevoJuego, setNuevoJuego] = useState({
    nombre: "",
    genero: "",
    plataforma: "",
    anio: "",
    imagen: "",
  });
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar los juegos del backend
  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/juegos/test");
        setJuegos(res.data);
      } catch (err) {
        console.error("❌ Error al cargar los juegos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJuegos();
  }, []);

  // 🔹 Manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoJuego({ ...nuevoJuego, [name]: value });
  };

  // 🔹 Agregar nuevo juego (local + backend)
  const agregarJuego = async () => {
    if (!nuevoJuego.nombre.trim()) return alert("Ponle un nombre al juego 😅");

    try {
      const res = await axios.post("http://localhost:3000/api/juegos", nuevoJuego);
      setJuegos([...juegos, res.data.juego]);
      setNuevoJuego({
        nombre: "",
        genero: "",
        plataforma: "",
        anio: "",
        imagen: "",
      });
    } catch (error) {
      console.error("❌ Error al agregar juego:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>🎮 Biblioteca de Juegos</h1>

      {/* Formulario */}
      <div style={styles.form}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoJuego.nombre}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="genero"
          placeholder="Género"
          value={nuevoJuego.genero}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="plataforma"
          placeholder="Plataforma"
          value={nuevoJuego.plataforma}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="anio"
          placeholder="Año"
          value={nuevoJuego.anio}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="imagen"
          placeholder="URL Imagen"
          value={nuevoJuego.imagen}
          onChange={handleChange}
          style={styles.input}
        />
        <button onClick={agregarJuego} style={styles.boton}>
          Agregar juego
        </button>
      </div>

      {/* Lista */}
      {loading ? (
        <p style={{ color: "#aaa" }}>Cargando...</p>
      ) : (
        <div style={styles.grid}>
          {juegos.map((juego) => (
            <div key={juego.id} style={styles.card}>
              {juego.imagen ? (
                <img
                  src={juego.imagen}
                  alt={juego.nombre}
                  style={styles.img}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/150x200?text=Sin+imagen")
                  }
                />
              ) : (
                <div style={styles.noImg}>Sin imagen</div>
              )}
              <h3>{juego.nombre}</h3>
              <p>{juego.genero}</p>
              <p>{juego.plataforma}</p>
              <p>{juego.anio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#111",
    color: "#eee",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  titulo: { color: "#0ff", marginBottom: 20 },
  form: { display: "flex", gap: 5, marginBottom: 20 },
  input: {
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #555",
    background: "#222",
    color: "#fff",
  },
  boton: {
    padding: "8px 12px",
    borderRadius: "6px",
    background: "#000",
    color: "#fff",
    border: "1px solid #fff",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "15px",
  },
  card: {
    background: "#222",
    borderRadius: "10px",
    padding: "10px",
    textAlign: "center",
  },
  img: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  noImg: {
    height: "200px",
    background: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
  },
};

export default BibliotecaJuegos;
