// hashPassword.js
const bcrypt = require('bcryptjs');

const password = 'Eres2024'; // Pon aquí tu contraseña

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hash);
  }
});
