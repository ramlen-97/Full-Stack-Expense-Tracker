const path = require('path');
const User = require('../models/user');

const getSignupPage = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/views/signup.html'));

    } catch (error) {
        console.log(error);
        res.status(500).json({'error':error.message});
    }
}

const addUser=async(req,res)=>{
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({error:'Something is missing! Please fill all the details to proceed'});
    }
    try {
        const user = await User.findOne({ where: { email } });
        console.log(user);
        if (user) {
            return res.status(400).json({error:'User already exists. Please login!'})
        }
        const response=await User.create({...req.body});
        res.status(201).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error:error.message} );
    }
}

module.exports={
    getSignupPage,
    addUser
}