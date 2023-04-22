const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
    return token;
  };

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, 'secretkey');
        return decoded;
    } catch (err) {
        return null;
    }
};

module.exports = {generateToken, verifyToken}