import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar({ onPremium, onLogin, onNosotros, onBiblioteca, usuario, onCerrarSesion }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nombreUsuario = usuario?.user_metadata?.nombre || usuario?.email?.split('@')[0] || 'Usuario';

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">

        <a href="#hero" className="navbar__logo">
          <img
            src="/logo-etazla.png"
            alt="Efecto Etazla - Tu Yo Interno"
            className="navbar__logo-img"
          />
        </a>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <li><a href="#biblioteca" onClick={() => setMenuOpen(false)}>Biblioteca</a></li>
          <li>
            <button className="navbar__link-btn" onClick={() => { setMenuOpen(false); onBiblioteca(); }}>
              Colección
            </button>
          </li>
          <li><a href="#suscripcion" onClick={() => setMenuOpen(false)}>Subscripción</a></li>
          <li>
            <button className="navbar__link-btn" onClick={() => { setMenuOpen(false); onNosotros(); }}>
              Nosotros
            </button>
          </li>
          <li><a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a></li>
          <li>
            <button className="navbar__badge" onClick={() => { setMenuOpen(false); onPremium(); }}>
              Efecto Etazla Premium ✦
            </button>
          </li>
        </ul>

        {/* Si hay sesión muestra nombre + cerrar sesión, si no muestra botón Iniciar sesión */}
        {usuario ? (
          <div className="navbar__usuario">
            <span className="navbar__usuario-nombre">👤 {nombreUsuario}</span>
            <button className="navbar__cerrar-sesion" onClick={onCerrarSesion}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <button className="navbar__cta" onClick={onLogin}>
            Iniciar sesión →
          </button>
        )}

        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}