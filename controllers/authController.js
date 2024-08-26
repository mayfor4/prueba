const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = [
  { username: 'Eventostaven ', password: '$2a$10$045IgUTDWeRfD25KNg5F7uD82AaD0.RzgZ6DV4JRTS9fCym16YiNO' } // Reemplaza con el hash generado
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
      return res.status(500).json({ message: 'Server error' });
    }

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
/////////////////////token
    const token = jwt.sign({ username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  });
};
