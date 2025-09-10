const express=require('express');
const router=express.Router();
const userController=require('../controllers/user');

router.get('/signup',userController.getSignupPage);
router.post('/signup',userController.addUser);

module.exports=router;