import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <img
                src="/logo-etazla.png"
                alt="Efecto Etazla"
                className="footer__logo-img"
              />
            </div>

            <p className="footer__tagline">
              Plataforma editorial digital.<br />
              <em>Leer es un acto de resistencia cultural.</em>
            </p>

            <div className="footer__socials">
              <a href="#" className="footer__social footer__social--disabled">
                𝕏 Twitter
              </a>

              <a
                href="https://www.instagram.com/efectoetazla?igsh=MWJnYjg0bmp0cWdjeg=="
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social"
              >
                ◎ Instagram
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Explorar</h4>
            <ul className="footer__links">
              <li><a href="#biblioteca">Biblioteca</a></li>
              <li><a href="#suscripcion">Subscripción</a></li>
              <li><a href="#nosotros">Sobre nosotros</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Contacto</h4>
            <ul className="footer__links">
              <li>
                <a href="mailto:lucasalzate@efectoetazla.com">
                  lucasalzate@efectoetazla.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/efectoetazla?igsh=MWJnYjg0bmp0cWdjeg=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram: @efectoetazla
                </a>
              </li>
              <li>
                <span className="footer__owner">Lucas Alzate — Fundador</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>Efecto Etazla © 2026 — Plataforma editorial digital</p>
          <p className="footer__bottom-right">
            Leer es un acto de resistencia cultural.
          </p>
        </div>

      </div>
    </footer>
  );
}