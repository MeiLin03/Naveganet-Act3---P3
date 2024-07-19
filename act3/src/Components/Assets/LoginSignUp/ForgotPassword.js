import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook para navegación

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/forgot-password', { email });
      setMessage(response.data.message);
      // Redirigir a la página de reset password
      navigate('/reset-password');
    } catch (error) {
      setMessage('Error al solicitar el cambio de contraseña.');
      console.error('Error en el cliente:', error);
    }
  };

  return (
    <div className="container main">
      <div className="row">
        <div className="col-md-6 side-image"></div>
        <div className="col-md-6 right">
          <div className="input-box">
            <header>Recuperar Contraseña</header>
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
              <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
