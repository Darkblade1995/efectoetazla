import React, { useState } from 'react';
import './Coleccion.css';

const books = [
  {
    id: 1,
    category: 'Ensayo',
    title: 'El Arte de Pensar Despacio',
    author: 'Carlos Méndez',
    desc: 'Ensayo sobre creatividad y reflexión profunda en tiempos de aceleración.',
    color: '#E8F0E6',
    accent: '#4A6741'
  },
  {
    id: 2,
    category: 'Ficción',
    title: 'Ciudades Invisibles del Futuro',
    author: 'Ana Torres',
    desc: 'Ficción especulativa sobre arquitectura y sociedad en el siglo XXII.',
    color: '#F5E6D3',
    accent: '#C8874A'
  },
  {
    id: 3,
    category: 'Filosofía',
    title: 'Manual del Silencio',
    author: 'Elena Vargas',
    desc: 'Libro filosófico sobre atención, calma mental y el arte de no hacer.',
    color: '#EAE6F0',
    accent: '#7A6B9A'
  },
  {
    id: 4,
    category: 'Cuentos',
    title: 'Historias de Medianoche',
    author: 'Varios autores',
    desc: 'Colección de cuentos contemporáneos para leer en la quietud de la noche.',
    color: '#E6EEF5',
    accent: '#4A7BA6'
  },
];

export default function Coleccion() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="coleccion" id="coleccion">
      <div className="coleccion__container">

        <div className="coleccion__header">
          <div>
            <span className="coleccion__label">Colección</span>
            <h2 className="coleccion__title">Libros recomendados</h2>
          </div>
          <a href="#suscripcion" className="coleccion__ver-todos">Ver todos →</a>
        </div>

        <div className="coleccion__grid">
          {books.map((book) => (
            <div
              key={book.id}
              className={`book-card ${hovered === book.id ? 'book-card--hovered' : ''}`}
              style={{ '--book-bg': book.color, '--book-accent': book.accent }}
              onMouseEnter={() => setHovered(book.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="book-card__spine" />
              <div className="book-card__inner">
                <span className="book-card__category">{book.category}</span>
                <h3 className="book-card__title">{book.title}</h3>
                <p className="book-card__author">{book.author}</p>
                <p className="book-card__desc">{book.desc}</p>
                <a href="#suscripcion" className="book-card__cta">Leer ahora →</a>
              </div>
            </div>
          ))}
        </div>

        <div className="coleccion__quote">
          <div className="coleccion__quote-mark">"</div>
          <blockquote>
            La lectura es un acto de resistencia. En un mundo que nos pide
            constantemente que reaccionemos, leer nos permite que pensemos.
          </blockquote>
          <cite>— Fragmento de <em>El Arte de Pensar Despacio</em></cite>
        </div>

      </div>
    </section>
  );
}