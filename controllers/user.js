const path = require('path');
const User = require('../models/user');

const getSignupPage = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/views/signup.html'));

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const getLoginPage = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/views/login.html'));

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Something is missing! Please fill all the details to proceed' });
    }
    try {
        const user = await User.findOne({ where: { email } });
        console.log(user);
        // If user already exists
        if (user) {
            return res.status(400).json({ error: 'Email already exists. Please login!' })
        }
        const response = await User.create({ ...req.body });
        res.status(201).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Kindly enter your email and password to proceed' });
        }
        const user = await User.findOne({ where: { email } });
        console.log(user);
        // If user not found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // If password does not match
        if (user.password != password) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error, error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getSignupPage,
    addUser,
    getLoginPage,
    loginUser
}