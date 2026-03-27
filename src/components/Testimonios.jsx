import React from 'react';
import './Testimonios.css';

const testimonios = [
  {
    name: 'María González',
    role: 'Diseñadora',
    text: 'Efecto Etazla me devolvió el hábito de leer. Es como tener una biblioteca curada por expertos en mi bolsillo.',
    avatar: 'MG'
  },
  {
    name: 'Carlos Ruiz',
    role: 'Escritor',
    text: 'La experiencia de lectura es hermosa. Simple y elegante. Por fin alguien entiende que menos es más.',
    avatar: 'CR'
  },
  {
    name: 'Ana Torres',
    role: 'Profesora',
    text: 'Por fin una plataforma que respeta al lector. Sin notificaciones, sin distracciones, solo libros.',
    avatar: 'AT'
  },
];

export default function Testimonios() {
  return (
    <section className="testimonios">
      <div className="testimonios__container">

        <div className="testimonios__header">
          <span className="testimonios__label">Testimonios</span>
          <h2 className="testimonios__title">Lo que dicen nuestros lectores</h2>
        </div>

        <div className="testimonios__grid">
          {testimonios.map((t, i) => (
            <div key={i} className="testimonio">
              <div className="testimonio__quote">"</div>
              <p className="testimonio__text">{t.text}</p>
              <div className="testimonio__author">
                <div className="testimonio__avatar">{t.avatar}</div>
                <div>
                  <p className="testimonio__name">{t.name}</p>
                  <p className="testimonio__role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}