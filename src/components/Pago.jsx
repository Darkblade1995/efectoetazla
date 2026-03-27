import React, { useState } from 'react';
import './Pago.css';

const planes = [
  { id: 'lector', nombre: 'Plan Lector', precio: '$25.000', periodo: 'mes' },
  { id: 'escritor', nombre: 'Plan Escritor', precio: '$50.000', periodo: 'mes' },
];

export default function Pago({ onVolver }) {
  const [planSeleccionado, setPlanSeleccionado] = useState('lector');
  const [copiado, setCopiado] = useState(null);

  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const plan = planes.find(p => p.id === planSeleccionado);

  const copiar = (texto, campo) => {
    navigator.clipboard.writeText(texto.replace(/\s/g, ''));
    setCopiado(campo);
    setTimeout(() => setCopiado(null), 2000);
  };

  return (
    <div className="pago__page">
      <div className="pago__bg" />
      <div className="pago__container">

        <button className="pago__volver" onClick={onVolver}>
          ← Volver al inicio
        </button>

        <div className="pago__header">
          <span className="pago__label">Pago seguro</span>
          <h1 className="pago__title">
            Activa tu membresía<br />
            <em>Efecto Etazla</em>
          </h1>
          <p className="pago__subtitle">
            Elige tu plan y realiza el pago por RappiPay.
            Una vez confirmado el pago activamos tu cuenta en menos de 24 horas.
          </p>
        </div>

        <div className="pago__grid">

          {/* Columna izquierda */}
          <div className="pago__left">
            <div className="pago__seccion">
              <h3 className="pago__seccion-titulo">1. Elige tu plan</h3>
              <div className="pago__planes">
                {planes.map((p) => (
                  <div
                    key={p.id}
                    className={`pago__plan ${planSeleccionado === p.id ? 'pago__plan--activo' : ''}`}
                    onClick={() => setPlanSeleccionado(p.id)}
                  >
                    <div className="pago__plan-radio">
                      <div className={`pago__plan-dot ${planSeleccionado === p.id ? 'pago__plan-dot--activo' : ''}`} />
                    </div>
                    <div className="pago__plan-info">
                      <span className="pago__plan-nombre">{p.nombre}</span>
                    </div>
                    <span className="pago__plan-precio">{p.precio} / {p.periodo}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pago__seccion">
              <h3 className="pago__seccion-titulo">2. Método de pago</h3>
              <div
                className="pago__metodo-unico"
                style={{ background: '#FFF5F7', border: '2px solid #FF441F', borderRadius: '12px', padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}
              >
                <span style={{ fontSize: '1.6rem' }}>🛵</span>
                <span style={{ fontFamily: 'sans-serif', fontWeight: '600', color: '#FF441F', fontSize: '1rem' }}>RappiPay</span>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="pago__right">
            <div className="pago__card" style={{ '--card-color': '#FF441F', '--card-pale': '#FFF5F7' }}>

              <div className="pago__card-header">
                <span className="pago__card-emoji">🛵</span>
                <div>
                  <h3 className="pago__card-titulo">RappiPay</h3>
                  <span className="pago__card-plan">{plan.nombre} — {plan.precio}</span>
                </div>
              </div>

              <div className="pago__datos">

                <div className="pago__dato">
                  <span className="pago__dato-label">Número de cuenta</span>
                  <div className="pago__dato-valor">
                    <span>141 144 472</span>
                    <button
                      className={`pago__copiar ${copiado === 'numero' ? 'pago__copiar--copiado' : ''}`}
                      onClick={() => copiar('141144472', 'numero')}
                    >
                      {copiado === 'numero' ? '✓ Copiado' : 'Copiar'}
                    </button>
                  </div>
                </div>

                <div className="pago__dato">
                  <span className="pago__dato-label">Titular</span>
                  <div className="pago__dato-valor">
                    <span>Lucas Alzate Lebolo</span>
                  </div>
                </div>

                <div className="pago__dato">
                  <span className="pago__dato-label">Tipo de cuenta</span>
                  <div className="pago__dato-valor">
                    <span>Persona Natural</span>
                  </div>
                </div>

                <div className="pago__dato">
                  <span className="pago__dato-label">Monto a pagar</span>
                  <div className="pago__dato-valor pago__dato-valor--destacado">
                    <span>{plan.precio} COP</span>
                  </div>
                </div>

              </div>

              <div className="pago__instruccion">
                <span>📋</span>
                <p>Envía el pago al número RappiPay y adjunta el comprobante al correo indicado abajo.</p>
              </div>

              <div className="pago__comprobante">
                <p className="pago__comprobante-titulo">Envía tu comprobante a:</p>
                <span
                  className="pago__comprobante-email"
                  style={{ cursor: 'pointer' }}
                  onClick={() => copiar('hola@efectoetazla.com', 'email')}
                >
                  hola@efectoetazla.com {copiado === 'email' ? '✓' : ''}
                </span>
                <p className="pago__comprobante-nota">
                  Incluye tu nombre completo y el plan elegido en el asunto del correo.
                  Activamos tu cuenta en menos de 24 horas.
                </p>
              </div>

              <div className="pago__seguridad">
                🔒 Pago manual verificado · Sin comisiones · Cancela cuando quieras
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}