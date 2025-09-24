const express=require('express');
const paymentController=require('../controllers/paymentController');
const userAuthentication=require('../middleware/auth');

const router=express.Router();

//Create payment order and fetch payment session Id;
router.post('/pay',userAuthentication,paymentController.processPayment);

router.get('/payment-status/:orderId',paymentController.getPaymentStatus);

module.exports=router;