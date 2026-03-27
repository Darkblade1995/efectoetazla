import React, { useState } from 'react';
import { supabase } from '../supabase';
import './Login.css';

export default function Login({ onVolver, onRegistro, onExito }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [recordar, setRecordar] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError('Correo o contraseña incorrectos.');
      setCargando(false);
    } else {
      onExito();
    }
  };

  return (
    <div className="login__page">
      <div className="login__bg" />
      <div className="login__container">

        <div className="login__left">
          <button className="login__volver" onClick={onVolver}>← Volver al inicio</button>
          <div className="login__brand">
            <span>📖</span>
            <span className="login__brand-text">Efecto Etazla</span>
          </div>
          <h1 className="login__title">
            Bienvenido<br />
            <em>de vuelta</em>
          </h1>
          <p className="login__subtitle">
            Tu biblioteca personal te está esperando. Continúa donde lo dejaste.
          </p>
          <div className="login__quote">
            <div className="login__quote-mark">"</div>
            <p>La lectura es un acto de resistencia. En un mundo que nos pide constantemente que reaccionemos, leer nos permite que pensemos.</p>
            <cite>— El Arte de Pensar Despacio</cite>
          </div>
        </div>

        <div className="login__right">
          <div className="login__card">
            <h2 className="login__card-title">Iniciar sesión</h2>
            <p className="login__card-sub">Accede a tu cuenta de Efecto Etazla</p>

            {error && <div className="login__error">⚠️ {error}</div>}

            <form className="login__form" onSubmit={handleSubmit}>
              <div className="login__field">
                <label className="login__label">Correo electrónico</label>
                <input className="login__input" type="email" name="email" placeholder="tucorreo@email.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className="login__field">
                <label className="login__label">Contraseña</label>
                <input className="login__input" type="password" name="password" placeholder="Tu contraseña" value={form.password} onChange={handleChange} required />
              </div>
              <div className="login__opciones">
                <label className="login__recordar">
                  <input type="checkbox" checked={recordar} onChange={() => setRecordar(!recordar)} />
                  <span>Recordarme</span>
                </label>
                <a href="#recuperar" className="login__olvidaste">¿Olvidaste tu contraseña?</a>
              </div>
              <button type="submit" className="login__submit" disabled={cargando}>
                {cargando ? 'Iniciando sesión...' : 'Iniciar sesión →'}
              </button>
            </form>

            <p className="login__registro">
              ¿No tienes cuenta?{' '}
              <button className="login__registro-link" onClick={onRegistro}>Regístrate gratis</button>
            </p>
            <p className="login__footnote">🔒 Conexión segura y encriptada</p>
          </div>
        </div>
      </div>
    </div>
  );
}