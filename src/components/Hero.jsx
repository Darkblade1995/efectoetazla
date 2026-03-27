import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__container">
        <div className="hero__content">
          <span className="hero__eyebrow">Biblioteca Digital</span>
          <h1 className="hero__title">
            Donde la lectura<br />
            <em>se convierte</em><br />
            en reflexión
          </h1>
          <p className="hero__description">
            Efecto Etazla es un espacio digital por suscripción donde la lectura,
            la reflexión y la escritura se encuentran, explora clásicos de dominio público,
            reflexiones originales y textos seleccionados por nuestra editorial.
          </p>
          <div className="hero__actions">
            <a href="#coleccion" className="btn btn--primary">Explorar biblioteca</a>
            <a href="#suscripcion" className="btn btn--outline">Subscribirme ahora</a>
          </div>
          <div className="hero__badges">
            <span>✦ Acceso inmediato</span>
            <span>✦ Lectura ilimitada</span>
            <span>✦ Sin anuncios</span>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__book-mockup">
            <img
              src="/book-cover.png"
              alt="El Niño Que No Dejaste De Ser - Efecto Etazla"
              className="hero__book-image"
            />
          </div>

          <div className="hero__launch-banner">
            <span className="hero__launch-star">✦</span>
            <span className="hero__launch-text">Gran Lanzamiento</span>
            <span className="hero__launch-star">✦</span>
          </div>

          <div className="hero__card hero__card--1">
            <span>📚</span>
            <span>50+ libros / mes</span>
          </div>
          <div className="hero__card hero__card--2">
            <span>✍️</span>
            <span>24k lectores activos</span>
          </div>
        </div>
      </div>
    </section>
  );
}