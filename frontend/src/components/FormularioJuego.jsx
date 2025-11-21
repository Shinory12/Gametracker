import React, { useState } from 'react';
import API from '../api';

export default function FormularioJuego({ onCrear }){
  const [form, setForm] = useState({ titulo:'', genero:'', plataforma:'', añoLanzamiento:'', desarrollador:'', imagenPortada:'', descripcion:'' });

  const submit = async (e) => {
    e.preventDefault();
    const res = await API.post('/juegos', { ...form, añoLanzamiento: Number(form.añoLanzamiento) });
    onCrear(res.data);
    setForm({ titulo:'', genero:'', plataforma:'', añoLanzamiento:'', desarrollador:'', imagenPortada:'', descripcion:'' });
  };

  return (
    <form onSubmit={submit}>
      <input value={form.titulo} onChange={e=>setForm({...form,titulo:e.target.value})} placeholder="Título" required />
      <input value={form.genero} onChange={e=>setForm({...form,genero:e.target.value})} placeholder="Género" />
      <input value={form.plataforma} onChange={e=>setForm({...form,plataforma:e.target.value})} placeholder="Plataforma" />
      <input value={form.añoLanzamiento} onChange={e=>setForm({...form,añoLanzamiento:e.target.value})} placeholder="Año" />
      <input value={form.imagenPortada} onChange={e=>setForm({...form,imagenPortada:e.target.value})} placeholder="URL portada" />
      <textarea value={form.descripcion} onChange={e=>setForm({...form,descripcion:e.target.value})} placeholder="Descripción"></textarea>
      <button type="submit">Agregar juego</button>
    </form>
  );
}
