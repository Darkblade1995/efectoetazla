import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Biblioteca.css';

const supabase = createClient(
  'https://zdfpeyooosmnfzieopfj.supabase.co',
  'sb_publishable_Zs_HSttPCZYDUzUZPYcEIA_K8NzhaLa'
);

const librosIniciales = [
  {
    id: 1,
    titulo: 'El Arte de Pensar Despacio',
    autor: 'Carlos Méndez',
    categoria: 'Ensayo',
    contenido: 'En un mundo que celebra la velocidad, pensar despacio es un acto revolucionario. No se trata de pereza mental, sino de profundidad. De permitirle a las ideas el tiempo que necesitan para madurar, para conectarse con otras ideas, para convertirse en algo verdadero.\n\nLa mente acelerada produce respuestas. La mente pausada produce comprensión. Y hay una diferencia enorme entre responder y comprender.\n\nCuando leemos sin prisa, cuando escribimos sin presión, cuando conversamos sin mirar el reloj, algo cambia en nosotros. Empezamos a notar matices que antes ignorábamos. Empezamos a escuchar lo que no se dice. Empezamos a pensar.\n\nEste ensayo es una invitación a recuperar ese tiempo. No como nostalgia, sino como necesidad. Como acto de resistencia ante una cultura que confunde rapidez con inteligencia.',
    color: '#E8F0E6',
    accent: '#4A6741',
  },
  {
    id: 2,
    titulo: 'Ciudades Invisibles del Futuro',
    autor: 'Ana Torres',
    categoria: 'Ficción',
    contenido: 'La ciudad no tenía nombre todavía. Solo tenía luz.\n\nEra una luz distinta a la que conocíamos: no venía del sol ni de ninguna fuente artificial. Venía de las paredes mismas, de los árboles plantados en los tejados, de las aceras que absorbían el calor del día y lo devolvían como resplandor suave durante la noche.\n\nYo llegué ahí por accidente. O eso creí al principio.\n\nLuego entendí que nadie llega a las ciudades invisibles por accidente. Uno las merece, o las necesita, o simplemente está listo para verlas. Porque han estado siempre ahí, superpuestas sobre las ciudades reales, esperando que alguien aprenda a mirar de otra manera.\n\nLa mujer que me recibió se llamaba Vera. Tenía los ojos del color del cielo justo antes de que empiece a llover.',
    color: '#F5E6D3',
    accent: '#C8874A',
  },
  {
    id: 3,
    titulo: 'Manual del Silencio',
    autor: 'Elena Vargas',
    categoria: 'Filosofía',
    contenido: 'El silencio no es la ausencia de sonido. Es una presencia en sí misma.\n\nHay culturas que lo saben desde hace siglos. Culturas que construyeron sus rituales alrededor del silencio, que enseñaron a sus hijos a habitarlo sin miedo, que entendieron que en el silencio no hay vacío sino plenitud.\n\nNosotros, en cambio, le tenemos terror. Llenamos cada pausa con música, con notificaciones, con conversaciones que no dicen nada pero que impiden que el silencio nos alcance.\n\n¿Por qué?\n\nTalvez porque en el silencio nos encontramos con nosotros mismos. Y eso, para muchos, es el encuentro más aterrador de todos.\n\nEste manual no pretende enseñar técnicas. Pretende recordar algo que ya sabemos pero hemos olvidado: que el silencio es nuestro estado natural. Y que volver a él es volver a casa.',
    color: '#EAE6F0',
    accent: '#7A6B9A',
  },
];

const PALABRAS_POR_PAGINA = 80;

function dividirEnPaginas(contenido) {
  const palabras = contenido.split(' ');
  const paginas = [];
  for (let i = 0; i < palabras.length; i += PALABRAS_POR_PAGINA) {
    paginas.push(palabras.slice(i, i + PALABRAS_POR_PAGINA).join(' '));
  }
  return paginas;
}

function LibroVisor({ libro, onCerrar }) {
  const [paginaActual, setPaginaActual] = useState(0);
  const [volteando, setVolteando] = useState(null);
  const paginas = dividirEnPaginas(libro.contenido);

  const irA = (direccion) => {
    if (volteando) return;
    if (direccion === 'siguiente' && paginaActual >= paginas.length - 1) return;
    if (direccion === 'anterior' && paginaActual <= 0) return;
    setVolteando(direccion);
    setTimeout(() => {
      setPaginaActual(prev => direccion === 'siguiente' ? prev + 1 : prev - 1);
      setVolteando(null);
    }, 500);
  };

  return (
    <div className="libro-visor__overlay" onClick={onCerrar}>
      <div className="libro-visor" onClick={(e) => e.stopPropagation()}>
        <button className="libro-visor__cerrar" onClick={onCerrar}>✕</button>
        <div className="libro-visor__escenario">
          <div className="libro-visor__tapa-izq" style={{ background: libro.accent }}>
            <span className="libro-visor__tapa-titulo">{libro.titulo}</span>
          </div>
          <div className={`libro-visor__libro ${volteando ? `libro-visor__libro--${volteando}` : ''}`}>
            <div className="libro-visor__spine" style={{ background: libro.accent }} />
            <div className="libro-visor__pagina">
              <div className="libro-visor__pagina-header">
                <span className="libro-visor__categoria">{libro.categoria}</span>
                <span className="libro-visor__pagina-num">{paginaActual + 1} / {paginas.length}</span>
              </div>
              {paginaActual === 0 && (
                <>
                  <h2 className="libro-visor__titulo">{libro.titulo}</h2>
                  <p className="libro-visor__autor">— {libro.autor}</p>
                  <div className="libro-visor__separador" style={{ background: libro.accent }} />
                </>
              )}
              <div className="libro-visor__contenido">
                {paginas[paginaActual].split('\n\n').map((parrafo, i) => (
                  <p key={i}>{parrafo}</p>
                ))}
              </div>
              <div className="libro-visor__progress">
                {paginas.map((_, i) => (
                  <div
                    key={i}
                    className={`libro-visor__dot ${i === paginaActual ? 'libro-visor__dot--activo' : ''}`}
                    onClick={() => setPaginaActual(i)}
                  />
                ))}
              </div>
            </div>
            {volteando && (
              <div className={`libro-visor__hoja-volteando libro-visor__hoja-volteando--${volteando}`}>
                <div className="libro-visor__hoja-frente">
                  <div className="libro-visor__contenido">
                    {paginas[paginaActual].split('\n\n').map((parrafo, i) => <p key={i}>{parrafo}</p>)}
                  </div>
                </div>
                <div className="libro-visor__hoja-dorso">
                  <div className="libro-visor__contenido">
                    {paginas[
                      volteando === 'siguiente'
                        ? Math.min(paginaActual + 1, paginas.length - 1)
                        : Math.max(paginaActual - 1, 0)
                    ].split('\n\n').map((parrafo, i) => <p key={i}>{parrafo}</p>)}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="libro-visor__zona-siguiente" onClick={() => irA('siguiente')} title="Página siguiente" />
          <div className="libro-visor__zona-anterior" onClick={() => irA('anterior')} title="Página anterior" />
        </div>
        <div className="libro-visor__controles">
          <button className="libro-visor__btn" onClick={() => irA('anterior')} disabled={paginaActual === 0 || !!volteando}>
            ← Anterior
          </button>
          <span className="libro-visor__pagina-label">{paginaActual + 1} de {paginas.length}</span>
          <button className="libro-visor__btn libro-visor__btn--primary" onClick={() => irA('siguiente')} disabled={paginaActual === paginas.length - 1 || !!volteando}>
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}

function NuevoLibroForm({ onGuardar, onCancelar, guardando }) {
  const [form, setForm] = useState({ titulo: '', autor: '', categoria: 'Ensayo', contenido: '' });

  const categorias = ['Ensayo', 'Ficción', 'Filosofía', 'Poesía', 'Crónica', 'Cuentos'];
  const colores = {
    'Ensayo':    { color: '#E8F0E6', accent: '#4A6741' },
    'Ficción':   { color: '#F5E6D3', accent: '#C8874A' },
    'Filosofía': { color: '#EAE6F0', accent: '#7A6B9A' },
    'Poesía':    { color: '#E6EEF5', accent: '#4A7BA6' },
    'Crónica':   { color: '#F0EAE0', accent: '#8B6914' },
    'Cuentos':   { color: '#F5E6E6', accent: '#A64A4A' },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titulo || !form.contenido) return;
    onGuardar({ ...form, ...colores[form.categoria] });
  };

  return (
    <div className="nuevo-libro__overlay" onClick={onCancelar}>
      <div className="nuevo-libro" onClick={(e) => e.stopPropagation()}>
        <h3 className="nuevo-libro__title">Crear nuevo escrito</h3>
        <form className="nuevo-libro__form" onSubmit={handleSubmit}>
          <div className="nuevo-libro__field">
            <label>Título</label>
            <input
              type="text"
              placeholder="El título de tu escrito..."
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              required
            />
          </div>
          <div className="nuevo-libro__field">
            <label>Autor</label>
            <input
              type="text"
              placeholder="Tu nombre..."
              value={form.autor}
              onChange={(e) => setForm({ ...form, autor: e.target.value })}
            />
          </div>
          <div className="nuevo-libro__field">
            <label>Categoría</label>
            <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
              {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="nuevo-libro__field">
            <label>Contenido</label>
            <textarea
              placeholder="Escribe aquí tu texto... Mientras más escribas, más páginas tendrá tu libro."
              value={form.contenido}
              onChange={(e) => setForm({ ...form, contenido: e.target.value })}
              rows={10}
              required
            />
            <span className="nuevo-libro__hint">
              {form.contenido.split(' ').filter(Boolean).length} palabras
              · {Math.ceil(form.contenido.split(' ').filter(Boolean).length / PALABRAS_POR_PAGINA) || 1} página(s)
            </span>
          </div>
          <div className="nuevo-libro__actions">
            <button type="button" className="nuevo-libro__btn--cancelar" onClick={onCancelar}>
              Cancelar
            </button>
            <button type="submit" className="nuevo-libro__btn--guardar" disabled={guardando}>
              {guardando ? 'Publicando...' : 'Publicar escrito →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Biblioteca({ onVolver }) {
  const [libros, setLibros] = useState(librosIniciales);
  const [libroAbierto, setLibroAbierto] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    cargarEscritos();
  }, []);

  const cargarEscritos = async () => {
    setCargando(true);
    const { data, error } = await supabase
      .from('escritos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error cargando escritos:', error);
      setError('No se pudieron cargar los escritos.');
    } else if (data && data.length > 0) {
      setLibros([...librosIniciales, ...data]);
    }
    setCargando(false);
  };

  const guardarLibro = async (nuevoLibro) => {
    setGuardando(true);
    setError(null);

    const { data, error } = await supabase
      .from('escritos')
      .insert([{
        titulo: nuevoLibro.titulo,
        autor: nuevoLibro.autor,
        categoria: nuevoLibro.categoria,
        contenido: nuevoLibro.contenido,
        color: nuevoLibro.color,
        accent: nuevoLibro.accent,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error guardando escrito:', error);
      setError('No se pudo guardar el escrito. Intenta de nuevo.');
    } else {
      setLibros(prev => [...prev, data]);
      setMostrarForm(false);
    }
    setGuardando(false);
  };

  return (
    <div className="biblioteca">
      <div className="biblioteca__container">
        <button className="biblioteca__volver" onClick={onVolver}>← Volver al inicio</button>

        <div className="biblioteca__header">
          <div>
            <span className="biblioteca__label">Colección</span>
            <h1 className="biblioteca__title">Biblioteca Efecto Etazla</h1>
            <p className="biblioteca__subtitle">
              Explora escritos, reflexiones y narrativas de nuestra comunidad.
            </p>
          </div>
          <button className="biblioteca__nuevo-btn" onClick={() => setMostrarForm(true)}>
            + Crear escrito
          </button>
        </div>

        {error && (
          <div className="biblioteca__error">⚠️ {error}</div>
        )}

        {cargando ? (
          <div className="biblioteca__cargando">Cargando escritos...</div>
        ) : (
          <div className="biblioteca__grid">
            {libros.map((libro) => (
              <div
                key={libro.id}
                className="biblioteca-card"
                style={{ '--card-bg': libro.color, '--card-accent': libro.accent }}
              >
                <div className="biblioteca-card__spine" />
                <div className="biblioteca-card__inner">
                  <span className="biblioteca-card__categoria">{libro.categoria}</span>
                  <h3 className="biblioteca-card__titulo">{libro.titulo}</h3>
                  <p className="biblioteca-card__autor">{libro.autor}</p>
                  <p className="biblioteca-card__preview">{libro.contenido.slice(0, 120)}...</p>
                  <div className="biblioteca-card__footer">
                    <span className="biblioteca-card__paginas">
                      📄 {Math.ceil(libro.contenido.split(' ').length / PALABRAS_POR_PAGINA)} páginas
                    </span>
                    <button
                      className="biblioteca-card__leer"
                      onClick={() => setLibroAbierto(libro)}
                    >
                      Leer →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {libroAbierto && (
        <LibroVisor libro={libroAbierto} onCerrar={() => setLibroAbierto(null)} />
      )}

      {mostrarForm && (
        <NuevoLibroForm
          onGuardar={guardarLibro}
          onCancelar={() => setMostrarForm(false)}
          guardando={guardando}
        />
      )}
    </div>
  );
}