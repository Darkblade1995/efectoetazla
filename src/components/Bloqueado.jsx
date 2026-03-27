import React from 'react';
import './Bloqueado.css';

export default function Bloqueado({ onVolver, onSuscribirse, onLogin }) {
  return (
    <div className="bloqueado__overlay">
      <div className="bloqueado__card">

        <button className="bloqueado__volver" onClick={onVolver}>
          ← Volver al inicio
        </button>

        <div className="bloqueado__icon">📖</div>

        <span className="bloqueado__badge">Contenido Exclusivo</span>

        <h2 className="bloqueado__title">
          Este contenido es para<br />
          <em>miembros de Efecto Etazla</em>
        </h2>

        <p className="bloqueado__desc">
          Accede a reflexiones originales, contenido editorial exclusivo
          y publica tus propias ideas. Únete a nuestra comunidad de
          lectores y escritores.
        </p>

        <div className="bloqueado__plans">
          <div className="bloqueado__plan">
            <span className="bloqueado__plan-name">Lector</span>
            <span className="bloqueado__plan-price">$25.000 / mes</span>
          </div>
          <div className="bloqueado__plan-divider">o</div>
          <div className="bloqueado__plan">
            <span className="bloqueado__plan-name">Escritor</span>
            <span className="bloqueado__plan-price">$50.000 / mes</span>
          </div>
        </div>

        <div className="bloqueado__actions">
          <a href="#suscripcion"  onClick={onSuscribirse}
                        className="bloqueado__btn bloqueado__btn--primary"
                style={{ cursor: 'pointer' }}
            >
            Suscribirme ahora
        </a>
         <button
                 onClick={onLogin}
                 className="bloqueado__btn bloqueado__btn--outline" >
                     Iniciar sesión
        </button>
        </div>

        <p className="bloqueado__footnote">
          🔒 Pago seguro · Cancela cuando quieras
        </p>

      </div>
    </div>
  );
}