import React from 'react'
import API from '../api'

export default function TarjetaJuego({ juego, onUpdate, onDelete }) {
  // Si no hay juego aún (cargando), mostramos un placeholder ligero
  if (!juego) {
    return (
      <div
        className="card"
        style={{
          width: '240px',
          height: '320px',
          border: '1px solid #eee',
          borderRadius: '10px',
          padding: '15px'
        }}
      >
        Cargando…
      </div>
    )
  }

  // Desestructurar con valores por defecto para evitar undefined
  const {
    _id,
    titulo = 'Sin título',
    genero = '—',
    plataforma = '—',
    añoLanzamiento = '—',
    completado = false,
    imagenPortada = '',
  } = juego || {}

  const toggleCompletado = async () => {
    try {
      const updated = await API.put(`/juegos/${_id}`, {
        ...juego,
        completado: !completado,
      })
      onUpdate?.(updated.data)
    } catch (err) {
      console.error('Error al actualizar:', err)
    }
  }

  const borrar = async () => {
    try {
      await API.delete(`/juegos/${_id}`)
      onDelete?.(_id)
    } catch (err) {
      console.error('Error al eliminar:', err)
    }
  }

  return (
    <div
      className="card"
      style={{
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '15px',
        width: '240px',
        textAlign: 'center',
        boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
      }}
    >
      <img
        src={imagenPortada || 'https://via.placeholder.com/220x300'}
        alt={titulo}
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '10px',
        }}
      />

      <h3 style={{ margin: '8px 0' }}>{titulo}</h3>
      <p style={{ color: '#555', fontSize: '14px' }}>
        {genero} · {plataforma}
      </p>
      <p>Año: {añoLanzamiento}</p>
      <p>{completado ? '✅ Completado' : '⏳ Por completar'}</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
        <button
          onClick={toggleCompletado}
          style={{ background: '#a08e43', color: '#fff', padding: '6px 10px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          {completado ? 'Marcar No completado' : 'Marcar Completado'}
        </button>
        <button
          onClick={borrar}
          style={{ background: '#942934', color: '#fff', padding: '6px 10px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
