import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/Assets/LoginSignUp/LoginSignup';
import Registro from './Components/Assets/LoginSignUp/Registro';
import ForgotPassword from './Components/Assets/LoginSignUp/ForgotPassword';
import ResetPassword from './Components/Assets/LoginSignUp/ResetPassword';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

