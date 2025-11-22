import { useState } from "react";
import AddGame from "./AddGame.jsx";
import ListaJuegos from "./ListaJuegos.jsx";
import "./App.css";

function App() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [pagina, setPagina] = useState("inicio");

  const navegar = (p) => {
    setPagina(p);
    setSidebarAbierto(false);
  };

  return (
    <div className="app-container">
      {/* Barra superior */}
      <header className="top-bar">
        <button className="hamburger" onClick={() => setSidebarAbierto(!sidebarAbierto)}>
          ☰
        </button>
        <h1 className="titulo">GameTracker</h1>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarAbierto ? "abierto" : ""}`}>
        <button onClick={() => navegar("inicio")} className="side-btn">🏠 Inicio</button>
        <button onClick={() => navegar("agregar")} className="side-btn">➕ Agregar Juego</button>
        <button onClick={() => navegar("lista")} className="side-btn">📃 Lista de Juegos</button>
      </aside>

      {/* Contenido */}
      <main className="contenido">
        {pagina === "inicio" && <h2 className="bienvenida">Bienvenido a GameTracker</h2>}
        {pagina === "agregar" && <AddGame />}
        {pagina === "lista" && <ListaJuegos />}
      </main>
    </div>
  );
}

export default App;
