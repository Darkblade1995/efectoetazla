import React, { useState } from 'react';
import './Suscripcion.css';

const plans = [
  {
    id: 'fundacional',
    name: 'Fundacional',
    price: 'GRATUITO',
    priceDetail: null,
    features: [
      { ok: true,  text: 'Acceso a libros de dominio público' },
      { ok: true,  text: 'Reflexiones de libros clásicos' },
      { ok: false, text: 'Lectura de contenido Efecto Etazla' },
      { ok: false, text: 'Lectura de reflexiones de autores' },
      { ok: false, text: 'Publicar reflexiones propias' },
      { ok: false, text: 'Perfil de autor' },
    ],
    ctaStyle: 'outline',
  },
  {
    id: 'lector',
    name: 'Lector',
    price: '$25.000',
    priceDetail: '/ mes',
    features: [
      { ok: true,  text: 'Acceso completo a biblioteca' },
      { ok: true,  text: 'Lectura de contenido Efecto Etazla' },
      { ok: true,  text: 'Reflexiones de autores' },
      { ok: false, text: 'Publicar reflexiones propias' },
      { ok: false, text: 'Perfil de autor' },
      { ok: false, text: 'Acceso a nuevas publicaciones' },
    ],
    ctaStyle: 'sage',
  },
  {
    id: 'escritor',
    name: 'Escritor',
    price: '$50.000',
    priceDetail: '/ mes',
    highlight: true,
    badge: 'Más completo',
    features: [
      { ok: true, text: 'Acceso completo a biblioteca' },
      { ok: true, text: 'Lectura de contenido exclusivo' },
      { ok: true, text: 'Publicar reflexiones propias' },
      { ok: true, text: 'Perfil de autor' },
      { ok: true, text: 'Acceso a nuevas publicaciones' },
    ],
    ctaStyle: 'primary',
  },
];

export default function Suscripcion({ onSuscribirse }) {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="suscripcion" id="suscripcion">
      <div className="suscripcion__container">

        <div className="suscripcion__header">
          <span className="suscripcion__label">Planes de Membresía</span>
          <h2 className="suscripcion__title">
            Elige tu experiencia<br />
            <em>de lectura</em>
          </h2>
          <p className="suscripcion__subtitle">
            Selecciona el plan que mejor se adapte a tus necesidades
            y comienza a disfrutar de contenido exclusivo.
          </p>
        </div>

        <div className="plans__grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${plan.highlight ? 'plan-card--highlight' : ''} ${hovered === plan.id ? 'plan-card--hovered' : ''}`}
              onMouseEnter={() => setHovered(plan.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {plan.badge && (
                <div className="plan-card__badge">{plan.badge} ✦</div>
              )}

              <div className="plan-card__top">
                <h3 className="plan-card__name">{plan.name}</h3>
                <div className="plan-card__price">
                  <span className="plan-card__price-num">{plan.price}</span>
                  {plan.priceDetail && (
                    <span className="plan-card__price-detail">{plan.priceDetail}</span>
                  )}
                </div>
              </div>

              <ul className="plan-card__features">
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    className={`plan-card__feature ${!f.ok ? 'plan-card__feature--off' : ''}`}
                  >
                    <span className="plan-card__check">{f.ok ? '✔' : '✘'}</span>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>

              <button
                    className={`plan-card__cta plan-card__cta--${plan.ctaStyle}`}
                    onClick={onSuscribirse}
                                    >
                        Obtener →
                        </button>
            </div>
          ))}
        </div>

        <p className="suscripcion__footnote">
          🔒 Pago seguro · Cancela cuando quieras
        </p>

      </div>
    </section>
  );
}