const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');

async function createUser(res, req) {

    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: 'User created!' });
    } catch (error) {
        res.status(500).json({ message: 'Could not create user: ', error });
    }
}

async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
        res.status(200).jsono({ token });
    } catch (error) {
        res.status(500).json({ message: 'Could not log in: ', error });
    }
}

module.exports = {
    createUser,
    login
};