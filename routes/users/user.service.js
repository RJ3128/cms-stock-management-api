const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function createUser(userCredentials) {
    const { username, email, password } = userCredentials;
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    return newUser;
}

async function authenticate(userCredentials) {
    const { username, password } = userCredentials;

    const user = await User.findOne({ username: username });
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid Password');

    const jwtSecret = process.env.JWT_SECRET;
    const userId = user.id.toString();

    const token = jwt.sign({ id: userId }, jwtSecret, { expiresIn: '4h' });
    return token;
}

module.exports = {
    createUser,
    authenticate
};