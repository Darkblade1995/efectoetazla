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
import PerfilUsuario from './components/PerfilUsuario';
import Recompensas from './components/Recompensas';

function App() {
  const [pagina, setPagina] = useState('inicio');
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuario(session?.user ?? null);
      setCargando(false);
    });

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

  const irAPaginaProtegida = (pag) => {
    if (usuario) {
      setPagina(pag);
    } else {
      setPagina('bloqueado');
    }
  };

  const irALeer = () => {
    const plan = usuario?.user_metadata?.plan;
    const esPremium = plan === 'lector' || plan === 'escritor';
    if (esPremium) {
      setPagina('perfil');
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

  if (pagina === 'perfil') {
    return (
      <PerfilUsuario
        usuario={usuario}
        onVolver={() => setPagina('inicio')}
        onCerrarSesion={cerrarSesion}
        onRecompensas={() => setPagina('recompensas')}
      />
    );
  }

  if (pagina === 'recompensas') {
    return (
      <Recompensas
        usuario={usuario}
        onVolver={() => setPagina('perfil')}
      />
    );
  }

  return (
    <div className="app">
      <Navbar
        onPremium={() => irAPaginaProtegida('coleccion')}
        onLogin={() => setPagina('login')}
        onNosotros={() => setPagina('nosotros')}
        onBiblioteca={() => irAPaginaProtegida('biblioteca')}
        onPerfil={() => irAPaginaProtegida('perfil')}
        usuario={usuario}
        onCerrarSesion={cerrarSesion}
      />
      <Hero usuario={usuario} onLeer={irALeer} />
      <Esencia />
      <Coleccion usuario={usuario} onSuscribirse={() => setPagina('registro')} />
      <Suscripcion onSuscribirse={() => setPagina('registro')} />
      <Testimonios />
      <FAQ onSuscribirse={() => setPagina('registro')} />
      <Footer onNosotros={() => setPagina('nosotros')} />
    </div>
  );
}

export default App;