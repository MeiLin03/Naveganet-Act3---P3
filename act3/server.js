const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'meicastillo290@gmail.com',
    pass: 'xjei rkrh llze jtfd'
  }
});

// Simulamos una base de datos en memoria para almacenar los tokens
const tokenStore = {};

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(20).toString('hex');
  tokenStore[token] = email; // Almacenar el token con el correo
  console.log(`Token generado para ${email}: ${token}`);

  const mailOptions = {
    from: 'meicastillo290@gmail.com',
    to: email,
    subject: 'Recuperación de Contraseña',
    text: `Aquí está tu token de recuperación: ${token}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Token enviado al correo.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo.' });
  }
});

app.post('/reset-password', (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden.' });
  }

  if (tokenStore[token]) {
    console.log(`Token válido: ${token}`);
    console.log(`Nueva contraseña: ${newPassword}`);
    delete tokenStore[token];  // Eliminar el token después de usarlo
    res.status(200).json({ message: 'Contraseña restablecida.' });
  } else {
    console.error('Token inválido');
    res.status(400).json({ message: 'Token inválido.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
