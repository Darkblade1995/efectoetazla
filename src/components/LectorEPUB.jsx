import React, { useState, useEffect, useRef } from 'react';
import { ReactReader } from 'react-reader';
import { supabase } from '../supabase';
import './LectorEPUB.css';

export default function LectorEPUB({ onCerrar }) {
  const [usuario, setUsuario] = useState(null);
  const [plan, setPlan] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [location, setLocation] = useState(
    localStorage.getItem('epub-location') || null
  );
  const renditionRef = useRef(null);

  useEffect(() => {
    const verificar = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCargando(false);
        return;
      }
      setUsuario(user);
      const planGuardado = user.user_metadata?.plan || 'fundacional';
      setPlan(planGuardado);
      setCargando(false);
    };
    verificar();
  }, []);

  const guardarProgreso = (epubcfi) => {
    setLocation(epubcfi);
    localStorage.setItem('epub-location', epubcfi);
  };

  if (cargando) {
    return (
      <div className="lector__overlay">
        <div className="lector__loading">Cargando...</div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="lector__overlay">
        <div className="lector__bloqueado">
          <span className="lector__icono">🔒</span>
          <h2>Inicia sesión para leer</h2>
          <p>Necesitas una cuenta para acceder a este contenido.</p>
          <button className="lector__btn" onClick={onCerrar}>Volver</button>
        </div>
      </div>
    );
  }

  if (plan === 'fundacional') {
    return (
      <div className="lector__overlay">
        <div className="lector__bloqueado">
          <span className="lector__icono">⭐</span>
          <h2>Contenido Premium</h2>
          <p>Este libro está disponible para los planes <strong>Lector</strong> y <strong>Escritor</strong>.</p>
          <button className="lector__btn" onClick={onCerrar}>Ver planes</button>
        </div>
      </div>
    );
  }

  return (
    <div className="lector__overlay">
      <div className="lector__wrapper">
        <div className="lector__topbar">
          <span className="lector__titulo">📖 Efecto Etazla</span>
          <button className="lector__cerrar" onClick={onCerrar}>✕ Cerrar</button>
        </div>
        <div className="lector__content">
          <ReactReader
            url="/books/libro.epub"
            location={location}
            locationChanged={guardarProgreso}
            getRendition={(rendition) => {
              renditionRef.current = rendition;
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
  );
}