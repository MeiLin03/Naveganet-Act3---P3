import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      setMessage(response.data.message);
      if (response.data.success) {
        navigate('/');
      }
    } catch (error) {
      setMessage('Error al iniciar sesión. Verifica tu correo y contraseña.');
    }
  };

  return (
    <div className="container main">
      <div className="row">
        <div className="col-md-6 side-image"></div>
        <div className="col-md-6 right">
          <div className="input-box">
            <header>Inicia sesión</header>
            <div id="loginNotification" className="alert d-none" role="alert"></div>
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="input-field">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                  autoComplete="off"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Correo Electrónico</label>
                <div className="invalid-feedback">Ingresa un correo válido.</div>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  minLength="8"
                  required
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Contraseña</label>
                <div className="invalid-feedback">La contraseña debe tener al menos 8 caracteres.</div>
              </div>
              <button type="submit" className="btn btn-primary" id="toast-button">Iniciar Sesión</button>
            </form>
            <hr />
            <button className="btn btn-danger" onClick={() => window.location.href = 'http://localhost:3000/auth/google'}>
              Iniciar sesión con Google
            </button>
            <div className="signin">
              <span>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></span>
            </div>
            <div className='forgpass'>
            <span>¿Olvidaste tu Contraseña? <a href="/forgot-password">Recuperar Contraseña</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;

