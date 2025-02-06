import './HomepageHeader.scss';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

export const HomepageHeader = () => {
  const handleLogin = async (googleResponse) => {
    const token = googleResponse.credential;

    const res = await fetch('http://localhost:7000/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ token })
    });

    if (res.ok) {
      alert('Login exitoso');
    } else {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <header className="homepageHeader">
      <div className="homepageHeader__buttonSection">
        <button>Hazte voluntario</button>
        <button>Ayúdanos con una donación</button>
      </div>
      <div className="homepageHeader__image">
        <img src="https://via.placeholder.com/150" alt="homepage-header" />
      </div>
      <div>
        <h1>Iniciar sesión</h1>
        <GoogleOAuthProvider clientId="931564268310-88ndm6pbslj18n1a2tgq5h1trenpdcm2.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => alert('Error en Google Login')}
          />
        </GoogleOAuthProvider>
      </div>
    </header>
  );
};
