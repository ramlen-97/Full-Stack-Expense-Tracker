const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getSignupPage = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/views/signup.html'));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong. Please try again' });
    }
}

const getLoginPage = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/views/login.html'));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong. Please try again' });
    }
}

const addUserPostSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Something is missing! Please fill all the details to proceed' });
        }
        const user = await User.findOne({ where: { email } });
        // If user already exists
        if (user) {
            return res.status(400).json({ message: 'Email already exists. Please login!' })
        }
        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async (error, hash) => {
            if (error) {
                throw new Error();
            }
            const user = await User.create({ name, email, password: hash });
            res.status(201).json({ message: 'User created successfully', token: jwt.sign({ userId: user.id, name }, process.env.TOKEN_SECRET) });
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong. Please try again' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Kindly enter your email and password to proceed' });
        }
        const user = await User.findOne({ where: { email } });
        console.log(user);
        // If user not found
        if (!user) {
            return res.status(404).json({ message: 'User not found. Please sign up!' });
        }
        // If password does not match
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                throw new Error();
            }
            if (result) {
                res.status(200).json({ message: 'User logged in successfully', token: jwt.sign({ userId: user.id, name: user.name }, process.env.TOKEN_SECRET) });
            } else {
                res.status(401).json({ message: 'Incorrect password. Please try again!' });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong. Please try again' });
    }
}

module.exports = {
    getSignupPage,
    getLoginPage,
    addUserPostSignup,
    loginUser
}