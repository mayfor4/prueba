// hashPassword.js
// Cargar variables de entorno desde .env
require('dotenv').config();

const bcrypt = require('bcryptjs');

// Acceder a la contraseña desde la variable de entorno
const password = process.env.ADMIN_PASSWORD;

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hash);
  }
});


//usuario: Eventostaven

//contraseña:
