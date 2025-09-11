const express=require('express');
const router=express.Router();
const userController=require('../controllers/user');

router.get('/signup',userController.getSignupPage)

router.get('/login',userController.getLoginPage);

router.post('/signup',userController.addUser);

router.post('/login',userController.loginUser);

module.exports=router;