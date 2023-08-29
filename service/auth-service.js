const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SIGN } = require('../config/jwt');

const register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = await req.db.collection('users').findOne({ username });
    if (user) {
      throw new Error('username already exist');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await req.db.collection('users').insertOne({ username, password: hashedPassword, role });
    res.status(200).json({
      message: 'user succesfuly registered',
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({ erorr: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await req.db.collection('users').findOne({ username });
  console.log(user);
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (isPasswordCorrect) {
    const token = jwt.sign({ username: user.username, id: user._id, role: user.role }, JWT_SIGN);
    res.status(200).json({
      message: 'user succesfully logged in',
      data: token,
    });
  } else {
    res.status(400).json({ error: 'password is incorrect' });
  }
};

module.exports = {
  register,
  login,
};
