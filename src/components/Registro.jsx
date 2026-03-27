import React, { useState } from 'react';
import { supabase } from '../supabase';
import './Registro.css';

const planes = [
  { id: 'fundacional', nombre: 'Fundacional', precio: 'Gratis', desc: 'Acceso a clásicos de dominio público' },
  { id: 'lector', nombre: 'Lector', precio: '$25.000 / mes', desc: 'Acceso completo a la biblioteca' },
  { id: 'escritor', nombre: 'Escritor', precio: '$50.000 / mes', desc: 'Publica tus propias reflexiones', destacado: true },
];

export default function Registro({ onVolver, onPagar, onExito }) {
  const [planSeleccionado, setPlanSeleccionado] = useState('lector');
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmar: '' });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmar) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (form.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setCargando(true);

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { nombre: form.nombre, plan: planSeleccionado }
      }
    });

    if (error) {
      setError('No se pudo crear la cuenta: ' + error.message);
      setCargando(false);
    } else {
      if (planSeleccionado !== 'fundacional') {
        onPagar();
      } else {
        onExito();
      }
    }
  };

  return (
    <div className="registro__page">
      <div className="registro__bg" />
      <div className="registro__container">

        <div className="registro__left">
          <button className="registro__volver" onClick={onVolver}>← Volver al inicio</button>
          <div className="registro__brand">
            <span>📖</span>
            <span className="registro__brand-text">Efecto Etazla</span>
          </div>
          <h1 className="registro__title">
            Únete a nuestra<br />
            <em>comunidad lectora</em>
          </h1>
          <p className="registro__subtitle">
            Más de 24.000 lectores ya disfrutan de una experiencia de lectura sin distracciones.
          </p>
          <div className="registro__beneficios">
            {['✦ Acceso inmediato al catálogo', '✦ Sin anuncios ni distracciones', '✦ Cancela cuando quieras', '✦ Contenido nuevo cada mes'].map((b, i) => (
              <p key={i} className="registro__beneficio">{b}</p>
            ))}
          </div>
        </div>

        <div className="registro__right">
          <div className="registro__card">
            <h2 className="registro__card-title">Crear cuenta</h2>
            <p className="registro__card-sub">Elige tu plan y comienza hoy</p>

            <div className="registro__planes">
              {planes.map((plan) => (
                <div
                  key={plan.id}
                  className={`registro__plan ${planSeleccionado === plan.id ? 'registro__plan--activo' : ''} ${plan.destacado ? 'registro__plan--destacado' : ''}`}
                  onClick={() => setPlanSeleccionado(plan.id)}
                >
                  {plan.destacado && <span className="registro__plan-badge">Popular</span>}
                  <div className="registro__plan-radio">
                    <div className={`registro__plan-dot ${planSeleccionado === plan.id ? 'registro__plan-dot--activo' : ''}`} />
                  </div>
                  <div className="registro__plan-info">
                    <span className="registro__plan-nombre">{plan.nombre}</span>
                    <span className="registro__plan-desc">{plan.desc}</span>
                  </div>
                  <span className="registro__plan-precio">{plan.precio}</span>
                </div>
              ))}
            </div>

            {error && <div className="registro__error">⚠️ {error}</div>}

            <form className="registro__form" onSubmit={handleSubmit}>
              <div className="registro__field">
                <label className="registro__label">Nombre completo</label>
                <input className="registro__input" type="text" name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={handleChange} required />
              </div>
              <div className="registro__field">
                <label className="registro__label">Correo electrónico</label>
                <input className="registro__input" type="email" name="email" placeholder="tucorreo@email.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className="registro__field">
                <label className="registro__label">Contraseña</label>
                <input className="registro__input" type="password" name="password" placeholder="Mínimo 8 caracteres" value={form.password} onChange={handleChange} required />
              </div>
              <div className="registro__field">
                <label className="registro__label">Confirmar contraseña</label>
                <input className="registro__input" type="password" name="confirmar" placeholder="Repite tu contraseña" value={form.confirmar} onChange={handleChange} required />
              </div>
              <button type="submit" className="registro__submit" disabled={cargando}>
                {cargando ? 'Creando cuenta...' : 'Crear mi cuenta →'}
              </button>
            </form>

            <p className="registro__footnote">🔒 Pago seguro · Cancela cuando quieras</p>
          </div>
        </div>
      </div>
    </div>
  );
}