import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', { email, password });
      setMessage(response.data.message);
      if (response.data.success) {
        navigate('/');
      }
    } catch (error) {
      setMessage('Error al registrarse. Inténtalo de nuevo.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="container main">
      <div className="row">
        <div className="col-md-6 side-image"></div>
        <div className="col-md-6 right">
          <div className="input-box">
            <header>Regístrate</header>
            <div id="registerNotification" className="alert d-none" role="alert"></div>
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
              <button type="submit" className="btn btn-primary">Regístrarme</button>
            </form>
            <hr />
            <button className="btn btn-danger" onClick={handleGoogleLogin}>Regístrate con Google</button>
            <div className="signin">
              <span>¿Ya tienes una cuenta? <a href="/">Ingresa aquí</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
