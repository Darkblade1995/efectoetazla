import React, { useState } from 'react';
import { supabase } from '../supabase';
import './Login.css';

export default function NuevaPassword({ onExito }) {
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmar) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setCargando(true);
    const { error } = await supabase.auth.updateUser({ password });
    setCargando(false);

    if (error) {
      setError('No se pudo actualizar: ' + error.message);
    } else {
      onExito();
    }
  };

  return (
    <div className="login__page">
      <div className="login__bg" />
      <div className="login__container">
        <div className="login__right" style={{ margin: '0 auto' }}>
          <div className="login__card">
            <h2 className="login__card-title">Nueva contraseña</h2>
            <p className="login__card-sub">Escribe tu nueva contraseña</p>

            {error && <div className="login__error">⚠️ {error}</div>}

            <form className="login__form" onSubmit={handleSubmit}>
              <div className="login__field">
                <label className="login__label">Nueva contraseña</label>
                <input
                  className="login__input"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="login__field">
                <label className="login__label">Confirmar contraseña</label>
                <input
                  className="login__input"
                  type="password"
                  placeholder="Repite tu contraseña"
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login__submit" disabled={cargando}>
                {cargando ? 'Guardando...' : 'Guardar contraseña →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}