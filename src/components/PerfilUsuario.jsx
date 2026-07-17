import React, { useState } from 'react';
import { ReactReader } from 'react-reader';
import './PerfilUsuario.css';

export default function PerfilUsuario({ usuario, onVolver, onCerrarSesion, onRecompensas }) {
  const nombre = usuario?.user_metadata?.nombre || usuario?.email?.split('@')[0] || 'Usuario';
  const email = usuario?.email;
  const plan = usuario?.user_metadata?.plan || 'fundacional';
  const esPremium = plan === 'lector' || plan === 'escritor';

  const [lectorAbierto, setLectorAbierto] = useState(false);
  const [location, setLocation] = useState(localStorage.getItem('epub-location') || null);

  const puntos = parseInt(localStorage.getItem('etazla_puntos') || '0');
  const insignias = JSON.parse(localStorage.getItem('etazla_insignias') || '[]');

  const guardarProgreso = (epubcfi) => {
    setLocation(epubcfi);
    localStorage.setItem('epub-location', epubcfi);
  };

  return (
    <div className="perfil__page">

      {lectorAbierto && (
        <div className="perfil__lector-overlay">
          <div className="perfil__lector-wrapper">
            <div className="perfil__lector-topbar">
              <span className="perfil__lector-titulo">📖 Efecto Etazla</span>
              <button className="perfil__lector-cerrar" onClick={() => setLectorAbierto(false)}>
                ✕ Cerrar
              </button>
            </div>
            <div className="perfil__lector-content">
              <ReactReader
                url="/books/libro.epub"
                location={location}
                locationChanged={guardarProgreso}
                getRendition={(rendition) => {
                  rendition.themes.default({
                    body: {
                      'font-family': 'Georgia, serif',
                      'font-size': '1.1rem',
                      'line-height': '1.8',
                      'color': '#1A1209',
                      'background': '#FAF7F2',
                      'padding': '0 2rem',
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="perfil__header">
        <button className="perfil__volver" onClick={onVolver}>← Volver al inicio</button>
        <div className="perfil__brand">📖 Efecto Etazla</div>
      </div>

      <div className="perfil__container">

        {/* Info usuario */}
        <div className="perfil__card perfil__card--info">
          <div className="perfil__avatar">
            {nombre.charAt(0).toUpperCase()}
          </div>
          <div className="perfil__datos">
            <h2 className="perfil__nombre">{nombre}</h2>
            <p className="perfil__email">{email}</p>
            <span className={`perfil__plan perfil__plan--${plan}`}>
              {plan === 'escritor' ? '✦ Escritor' : plan === 'lector' ? '★ Lector' : 'Fundacional'}
            </span>
          </div>
          <button className="perfil__cerrar-sesion" onClick={onCerrarSesion}>
            Cerrar sesión
          </button>
        </div>

        {/* Resumen recompensas */}
        <div className="perfil__recompensas-banner" onClick={onRecompensas}>
          <div className="perfil__recompensas-info">
            <span className="perfil__recompensas-titulo">🏆 Mis Recompensas</span>
            <span className="perfil__recompensas-sub">Ranking, puntos e insignias</span>
          </div>
          <div className="perfil__recompensas-stats">
            <div className="perfil__recompensas-stat">
              <span className="perfil__recompensas-num">{puntos}</span>
              <span className="perfil__recompensas-label">Puntos</span>
            </div>
            <div className="perfil__recompensas-stat">
              <span className="perfil__recompensas-num">{insignias.length}</span>
              <span className="perfil__recompensas-label">Insignias</span>
            </div>
          </div>
          <span className="perfil__recompensas-arrow">→</span>
        </div>

        {/* Sección libros */}
        <div className="perfil__seccion">
          <h3 className="perfil__seccion-titulo">Mi Biblioteca</h3>

          {esPremium ? (
            <div className="perfil__libros">
              <div className="perfil__libro-card">
                <div className="perfil__libro-cover">📗</div>
                <div className="perfil__libro-info">
                  <h4>El Arte de Pensar Despacio</h4>
                  <p>Carlos Méndez</p>
                  {location && (
                    <span className="perfil__progreso">Progreso guardado ✓</span>
                  )}
                </div>
                <button
                  className="perfil__leer-btn"
                  onClick={() => setLectorAbierto(true)}
                >
                  {location ? 'Continuar leyendo →' : 'Leer ahora →'}
                </button>
              </div>
            </div>
          ) : (
            <div className="perfil__bloqueado">
              <span className="perfil__bloqueado-icono">🔒</span>
              <h4>Contenido Premium</h4>
              <p>Actualiza tu plan para acceder a todos los libros.</p>
              <button className="perfil__upgrade-btn" onClick={onVolver}>
                Ver planes →
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}