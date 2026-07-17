import React, { useState, useEffect } from 'react';
import './Recompensas.css';

const INSIGNIAS = [
  { id: 'primer_libro', icono: '📖', nombre: 'Primer Libro', desc: 'Abriste tu primer libro', puntos: 50 },
  { id: 'lector_activo', icono: '🔥', nombre: 'Lector Activo', desc: 'Llevas 7 días seguidos leyendo', puntos: 100 },
  { id: 'madrugador', icono: '🌅', nombre: 'Madrugador', desc: 'Leíste antes de las 7am', puntos: 75 },
  { id: 'nocturno', icono: '🌙', nombre: 'Lector Nocturno', desc: 'Leíste después de las 11pm', puntos: 75 },
  { id: 'comentarista', icono: '✍️', nombre: 'Comentarista', desc: 'Dejaste tu primera reflexión', puntos: 80 },
  { id: 'explorador', icono: '🗺️', nombre: 'Explorador', desc: 'Exploraste 3 géneros distintos', puntos: 120 },
  { id: 'coleccionista', icono: '🏅', nombre: 'Coleccionista', desc: 'Completaste 5 libros', puntos: 200 },
  { id: 'elite', icono: '👑', nombre: 'Élite Etazla', desc: 'Alcanzaste 1000 puntos', puntos: 300 },
];

const RANKING_DEMO = [
  { nombre: 'Valentina R.', puntos: 1840, insignias: 7, avatar: 'V' },
  { nombre: 'Carlos M.', puntos: 1620, insignias: 6, avatar: 'C' },
  { nombre: 'Sofía L.', puntos: 1390, insignias: 5, avatar: 'S' },
  { nombre: 'Diego P.', puntos: 1150, insignias: 4, avatar: 'D' },
  { nombre: 'Ana T.', puntos: 980, insignias: 4, avatar: 'A' },
  { nombre: 'Miguel F.', puntos: 870, insignias: 3, avatar: 'M' },
  { nombre: 'Laura G.', puntos: 740, insignias: 3, avatar: 'L' },
  { nombre: 'Juan B.', puntos: 620, insignias: 2, avatar: 'J' },
];

export default function Recompensas({ usuario, onVolver }) {
  const nombre = usuario?.user_metadata?.nombre || usuario?.email?.split('@')[0] || 'Tú';
  const inicial = nombre.charAt(0).toUpperCase();

  const [puntos, setPuntos] = useState(0);
  const [insigniasGanadas, setInsigniasGanadas] = useState([]);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const puntosGuardados = parseInt(localStorage.getItem('etazla_puntos') || '0');
    const insigniasGuardadas = JSON.parse(localStorage.getItem('etazla_insignias') || '[]');
    setPuntos(puntosGuardados);
    setInsigniasGanadas(insigniasGuardadas);

    const miPosicion = { nombre: `${nombre} (Tú)`, puntos: puntosGuardados, insignias: insigniasGuardadas.length, avatar: inicial, esUsuario: true };
    const lista = [...RANKING_DEMO, miPosicion].sort((a, b) => b.puntos - a.puntos);
    setRanking(lista);
  }, []);

  const ganarInsignia = (insignia) => {
    if (insigniasGanadas.includes(insignia.id)) return;
    const nuevas = [...insigniasGanadas, insignia.id];
    const nuevosPuntos = puntos + insignia.puntos;
    setInsigniasGanadas(nuevas);
    setPuntos(nuevosPuntos);
    localStorage.setItem('etazla_insignias', JSON.stringify(nuevas));
    localStorage.setItem('etazla_puntos', nuevosPuntos.toString());
    const lista = [...RANKING_DEMO, { nombre: `${nombre} (Tú)`, puntos: nuevosPuntos, insignias: nuevas.length, avatar: inicial, esUsuario: true }].sort((a, b) => b.puntos - a.puntos);
    setRanking(lista);
  };

  const nivel = puntos < 200 ? 'Principiante' : puntos < 500 ? 'Lector' : puntos < 1000 ? 'Ávido' : 'Élite';
  const nivelColor = puntos < 200 ? '#8A7D6E' : puntos < 500 ? '#4A6741' : puntos < 1000 ? '#C8874A' : '#7A6B9A';
  const progreso = Math.min((puntos % 500) / 500 * 100, 100);

  return (
    <div className="recompensas__page">
      <div className="recompensas__header">
        <button className="recompensas__volver" onClick={onVolver}>← Volver al inicio</button>
        <div className="recompensas__brand">📖 Efecto Etazla</div>
      </div>

      <div className="recompensas__container">
        <div className="recompensas__titulo">
          <span className="recompensas__label">Sistema de recompensas</span>
          <h1 className="recompensas__h1">Tu progreso <em>lector</em></h1>
        </div>

        {/* Tarjeta de usuario */}
        <div className="recompensas__perfil-card">
          <div className="recompensas__avatar">{inicial}</div>
          <div className="recompensas__perfil-info">
            <h2>{nombre}</h2>
            <span className="recompensas__nivel" style={{ color: nivelColor }}>✦ Nivel {nivel}</span>
            <div className="recompensas__barra-wrap">
              <div className="recompensas__barra">
                <div className="recompensas__barra-fill" style={{ width: `${progreso}%`, background: nivelColor }} />
              </div>
              <span className="recompensas__barra-label">{puntos} pts</span>
            </div>
          </div>
          <div className="recompensas__stats">
            <div className="recompensas__stat">
              <span className="recompensas__stat-num">{puntos}</span>
              <span className="recompensas__stat-label">Puntos</span>
            </div>
            <div className="recompensas__stat">
              <span className="recompensas__stat-num">{insigniasGanadas.length}</span>
              <span className="recompensas__stat-label">Insignias</span>
            </div>
          </div>
        </div>

        <div className="recompensas__grid">

          {/* Ranking */}
          <div className="recompensas__seccion">
            <h3 className="recompensas__seccion-titulo">🏆 Ranking de lectores</h3>
            <div className="recompensas__ranking">
              {ranking.map((lector, i) => (
                <div key={i} className={`recompensas__ranking-item ${lector.esUsuario ? 'recompensas__ranking-item--yo' : ''}`}>
                  <span className={`recompensas__pos ${i === 0 ? 'oro' : i === 1 ? 'plata' : i === 2 ? 'bronce' : ''}`}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </span>
                  <div className="recompensas__rank-avatar">{lector.avatar}</div>
                  <span className="recompensas__rank-nombre">{lector.nombre}</span>
                  <span className="recompensas__rank-puntos">{lector.puntos} pts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insignias */}
          <div className="recompensas__seccion">
            <h3 className="recompensas__seccion-titulo">🎖️ Insignias</h3>
            <div className="recompensas__insignias">
              {INSIGNIAS.map((ins) => {
                const ganada = insigniasGanadas.includes(ins.id);
                return (
                  <div
                    key={ins.id}
                    className={`recompensas__insignia ${ganada ? 'recompensas__insignia--ganada' : ''}`}
                    onClick={() => ganarInsignia(ins)}
                    title={ganada ? 'Ya ganada' : `Ganar: +${ins.puntos} pts`}
                  >
                    <span className="recompensas__insignia-icono">{ins.icono}</span>
                    <span className="recompensas__insignia-nombre">{ins.nombre}</span>
                    <span className="recompensas__insignia-desc">{ins.desc}</span>
                    <span className="recompensas__insignia-pts">+{ins.puntos} pts</span>
                    {ganada && <span className="recompensas__insignia-check">✓</span>}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}