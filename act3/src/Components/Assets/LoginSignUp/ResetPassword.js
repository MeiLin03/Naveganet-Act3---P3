import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/reset-password', {
        token,
        newPassword,
        confirmPassword
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'Error al restablecer la contraseña.');
      console.error('Error en el cliente:', error);
    }
  };

  return (
    <div className="container main">
      <div className="row">
        <div className="col-md-6 side-image"></div>
        <div className="col-md-6 right">
          <div className="input-box">
            <header>Restablecer Contraseña</header>
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="input-field">
                <input
                  type="text"
                  className="form-control"
                  id="token"
                  required
                  autoComplete="off"
                  placeholder=" "
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
                <label htmlFor="token">Token</label>
                <div className="invalid-feedback">Ingresa el token recibido.</div>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  minLength="8"
                  required
                  placeholder=" "
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label htmlFor="newPassword">Nueva Contraseña</label>
                <div className="invalid-feedback">La contraseña debe tener al menos 8 caracteres.</div>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  minLength="8"
                  required
                  placeholder=" "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <div className="invalid-feedback">Las contraseñas deben coincidir.</div>
              </div>
              <button type="submit" className="btn btn-primary">Restablecer</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
