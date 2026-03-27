import React, { useState } from 'react';
import './FAQ.css';

const preguntas = [
  {
    q: '¿Qué es Efecto Etazla?',
    a: 'Es una plataforma digital de lectura y reflexión donde la palabra construye conciencia. Ofrecemos acceso a clásicos de dominio público, contenido original y un espacio editorial para escritores.',
    lista: null
  },
  {
    q: '¿Qué incluye la Membresía Fundacional?',
    a: 'Incluye acceso gratuito a libros de dominio público y reflexiones basadas en esos clásicos.',
    lista: null
  },
  {
    q: '¿Qué incluye la Membresía Lector?',
    a: null,
    lista: [
      'Todo lo de la Membresía Fundacional.',
      'Lectura de contenido original.',
      'Lectura de reflexiones de escritores miembros.',
    ]
  },
  {
    q: '¿Qué incluye la Membresía Escritor?',
    a: null,
    lista: [
      'Todo lo de la Membresía Lector.',
      'Publicación de reflexiones originales.',
      'Perfil básico de autor.',
    ]
  },
  {
    q: '¿Los libros son legales?',
    a: 'Sí. Son obras de dominio público compartidas con fines culturales y educativos.',
    lista: null
  },
  {
    q: '¿Puedo cancelar mi membresía?',
    a: 'Sí. Puedes cancelarla antes del siguiente ciclo de facturación sin ningún costo adicional.',
    lista: null
  },
  {
    q: '¿Puedo descargar los libros?',
    a: 'No. El contenido está disponible solo para lectura online dentro de la plataforma.',
    lista: null
  },
  {
    q: '¿Los escritores conservan sus derechos?',
    a: 'Sí. Cada autor conserva todos los derechos de su obra publicada en Efecto Etazla.',
    lista: null
  },
  {
    q: '¿Qué contenido no está permitido?',
    a: null,
    lista: [
      'Plagio.',
      'Contenido ofensivo.',
      'Incitación al odio o violencia.',
      'Spam.',
    ]
  },
  {
    q: '¿Cómo me registro?',
    a: 'Debes crear una cuenta con tu correo electrónico y elegir tu membresía desde la sección de suscripción.',
    lista: null
  },
];

export default function FAQ({ onSuscribirse }) {
  const [abierto, setAbierto] = useState(null);

  const toggle = (i) => setAbierto(abierto === i ? null : i);

  return (
    <section className="faq" id="faq">
      <div className="faq__container">

        <div className="faq__header">
          <span className="faq__label">Resolvemos tus dudas</span>
          <h2 className="faq__title">Preguntas frecuentes</h2>
          <p className="faq__subtitle">
            Todo lo que necesitas saber sobre Efecto Etazla,
            las membresías y el espacio para escritores.
          </p>
        </div>

        <div className="faq__lista-preguntas">
          {preguntas.map((item, i) => (
            <div
              key={i}
              className={`faq__item ${abierto === i ? 'faq__item--abierto' : ''}`}
            >
              <button
                className="faq__pregunta"
                onClick={() => toggle(i)}
              >
                <span className="faq__numero">{i + 1}.</span>
                <span className="faq__pregunta-texto">{item.q}</span>
                <span className="faq__icono">
                  {abierto === i ? '−' : '+'}
                </span>
              </button>

              <div className={`faq__respuesta ${abierto === i ? 'faq__respuesta--visible' : ''}`}>
                <div className="faq__respuesta-inner">
                  {item.a && <p>{item.a}</p>}
                  {item.lista && (
                    <ul className="faq__lista">
                      {item.lista.map((punto, j) => (
                        <li key={j}>{punto}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="faq__footer">
          <p className="faq__footer-text">
            ¿Más dudas? — Explora nuestras membresías o contacta al equipo
          </p>
          <div className="faq__footer-btns">
  <button
  className="faq__btn faq__btn--primary"
  onClick={onSuscribirse}
>
  Ver membresías →
</button>

<a
  href="mailto:hola@pageleaf.io"
  className="faq__btn faq__btn--outline"
>
  Contactar equipo
</a>
          </div>
        </div>

      </div>
    </section>
  );
}