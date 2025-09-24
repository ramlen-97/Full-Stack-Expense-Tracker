const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');

router.get('/signup',userController.getSignupPage)

router.get('/login',userController.getLoginPage);

router.post('/signup',userController.addUserPostSignup);

router.post('/login',userController.loginUser);

module.exports=router;