import React, { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Esencia from './components/Esencia';
import Coleccion from './components/Coleccion';
import Suscripcion from './components/Suscripcion';
import Testimonios from './components/Testimonios';
import Footer from './components/Footer';
import Bloqueado from './components/Bloqueado';
import Registro from './components/Registro';
import Login from './components/Login';
import FAQ from './components/FAQ';
import Nosotros from './components/Nosotros';
import Biblioteca from './components/Biblioteca';
import Pago from './components/Pago';

function App() {
  const [pagina, setPagina] = useState('inicio');
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Detecta sesión activa al cargar
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuario(session?.user ?? null);
      setCargando(false);
    });

    // Escucha cambios de sesión en tiempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
    setPagina('inicio');
  };

  // Función para páginas protegidas
  const irAPaginaProtegida = (pagina) => {
    if (usuario) {
      setPagina(pagina);
    } else {
      setPagina('bloqueado');
    }
  };

  if (cargando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#FAF7F2' }}>
        <p style={{ fontFamily: 'Georgia', color: '#8A7D6E' }}>Cargando...</p>
      </div>
    );
  }

  if (pagina === 'bloqueado') {
    return (
      <Bloqueado
        onVolver={() => setPagina('inicio')}
        onSuscribirse={() => setPagina('registro')}
        onLogin={() => setPagina('login')}
      />
    );
  }

  if (pagina === 'registro') {
    return (
      <Registro
        onVolver={() => setPagina('inicio')}
        onPagar={() => setPagina('pago')}
        onExito={() => setPagina('inicio')}
      />
    );
  }

  if (pagina === 'login') {
    return (
      <Login
        onVolver={() => setPagina('inicio')}
        onRegistro={() => setPagina('registro')}
        onExito={() => setPagina('inicio')}
      />
    );
  }

  if (pagina === 'nosotros') {
    return (
      <Nosotros
        onVolver={() => setPagina('inicio')}
        onSuscribirse={() => setPagina('registro')}
      />
    );
  }

  if (pagina === 'biblioteca') {
    return <Biblioteca onVolver={() => setPagina('inicio')} />;
  }

  if (pagina === 'pago') {
    return <Pago onVolver={() => setPagina('inicio')} />;
  }

  return (
    <div className="app">
      <Navbar
        onPremium={() => irAPaginaProtegida('coleccion')}
        onLogin={() => setPagina('login')}
        onNosotros={() => setPagina('nosotros')}
        onBiblioteca={() => irAPaginaProtegida('biblioteca')}
        usuario={usuario}
        onCerrarSesion={cerrarSesion}
      />
      <Hero />
      <Esencia />
      <Coleccion />
      <Suscripcion onSuscribirse={() => setPagina('registro')} />
      <Testimonios />
      <FAQ onSuscribirse={() => setPagina('registro')} />
      <Footer />
    </div>
  );
}

export default App;