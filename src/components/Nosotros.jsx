import React from 'react';
import './Nosotros.css';

const escritores = [
  {
    id: 4,
    nombre: 'Lucas Alzate',
    edad: 37,
    imagen: '/escritor4.jpg',
    inclinacion: 'Crónica & Narrativa',
    descripcion: 'Cronista de lo humano. Encuentra historias donde otros ven el silencio, y las convierte en experiencias que no se olvidan.',
    estrellas: 4,
    libros: 4,
  },
];

function Estrellas({ cantidad }) {
  return (
    <div className="escritor__estrellas">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`escritor__estrella ${i <= cantidad ? 'escritor__estrella--activa' : ''}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Nosotros({ onVolver, onSuscribirse }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="nosotros" id="nosotros">
      <div className="nosotros__container">

        <button className="nosotros__volver" onClick={onVolver}>
          ← Volver al inicio
        </button>

        <div className="nosotros__header">
          <span className="nosotros__label">Nuestro Escritor</span>
          <h2 className="nosotros__title">
            La voz detrás de<br />
            <em>Efecto Etazla</em>
          </h2>
          <p className="nosotros__subtitle">
            Escritor independiente comprometido con la palabra honesta,
            la reflexión profunda y la literatura que transforma.
          </p>
        </div>

        <div className="nosotros__grid">
          {escritores.map((e) => (
            <div key={e.id} className="escritor-card">
              <div className="escritor-card__imagen-wrap">
                <img
                  src={e.imagen}
                  alt={e.nombre}
                  className="escritor-card__imagen"
                />
                <div className="escritor-card__overlay">
                  <p className="escritor-card__desc-overlay">{e.descripcion}</p>
                </div>
              </div>

              <div className="escritor-card__body">
                <div className="escritor-card__top">
                  <div>
                    <h3 className="escritor-card__nombre">{e.nombre}</h3>
                    <span className="escritor-card__edad">{e.edad} años</span>
                  </div>
                  <span className="escritor-card__inclinacion">{e.inclinacion}</span>
                </div>

                <p className="escritor-card__desc">{e.descripcion}</p>

                <Estrellas cantidad={e.estrellas} />

                <div className="escritor-card__footer">
                  <span className="escritor-card__libros">
                    📖 {e.libros} publicaciones
                  </span>
                  <button className="escritor-card__btn">
                    Ver escritos →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="nosotros__cta">
          <p className="nosotros__cta-text">
            ¿Eres escritor y quieres publicar en Efecto Etazla?
          </p>
          <button className="nosotros__cta-btn" onClick={onSuscribirse}>
            Únete como escritor →
          </button>
        </div>

      </div>
    </section>
  );
}