const express=require('express');
const router=express.Router();
const userController=require('../controllers/user');

router.get('/signup',userController.getSignupPage);
router.post('/signup',userController.addUser);
router.get('/login',userController.getLoginPage);
router.post('/login',userController.loginUser);

module.exports=router;