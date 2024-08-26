require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//console.log("Username:", process.env.ADMIN_USERNAME);
//console.log("Hashed Password:", process.env.HASHED_PASSWORD);

const users = [
  { username: process.env.ADMIN_USERNAME, password: process.env.HASHED_PASSWORD }
];

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    console.log('User not found');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      console.error('Error comparing passwords:', err);
      return res.status(500).json({ message: 'Error comparing passwords' });
    }

    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Genera y envía el token si las credenciales son correctas
    const token = jwt.sign({ username: user.username }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  });
};
