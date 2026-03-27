import React from 'react';
import './Esencia.css';

const features = [
  {
    icon: '📅',
    title: 'Catálogo en crecimiento',
    desc: 'Lecturas nuevas cada mes, seleccionadas por nuestro equipo editorial.'
  },
  {
    icon: '📱',
    title: 'Acceso universal',
    desc: 'Lee desde móvil, tablet o computador. Tu biblioteca te sigue.'
  },
  {
    icon: '🧭',
    title: 'Lectura consciente',
    desc: 'Contenido seleccionado por editores, no por algoritmos.'
  },
];

export default function Esencia() {
  return (
    <section className="esencia" id="biblioteca">
      <div className="esencia__container">

        <div className="esencia__grid">
          <div className="esencia__text">
            <span className="esencia__label">Nuestra Esencia</span>
            <h2 className="esencia__title">
              Una editorial digital<br />
              <em>para lectores modernos</em>
            </h2>
            <p className="esencia__body">
              Efecto Etazla no es solo una biblioteca. Es una curaduría editorial.
              Seleccionamos libros que inspiran, enseñan y transforman. Nuestra misión
              es devolverle valor a la lectura en la era digital.
            </p>
            <p className="esencia__tagline">
              Aquí no encuentras ruido.<br />
              <strong>Encuentras historias.</strong>
            </p>
          </div>

          <div className="esencia__features">
            {features.map((f, i) => (
              <div key={i} className="esencia__feature">
                <div className="esencia__feature-icon">{f.icon}</div>
                <div>
                  <h3 className="esencia__feature-title">{f.title}</h3>
                  <p className="esencia__feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="esencia__stats">
          {[
            ['12', 'Editores curadores'],
            ['50+', 'Libros añadidos mensualmente'],
            ['24k', 'Lectores activos'],
          ].map(([num, label]) => (
            <div key={label} className="esencia__stat">
              <span className="esencia__stat-num">{num}</span>
              <span className="esencia__stat-label">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}