const { createOrder, paymentStatus } = require('../services/cashfreeServices');
const Payment = require('../models/payment');

const processPayment = async (req, res) => {
    try {
        const orderId = "ORDER-" + Date.now();
        const orderAmount = 2000;
        const orderCurrency = "INR";
        const customerId = req.user.id;
        const customerPhone = "9876543210";

        // Create an order in cashfree and get the payment session Id;
        const paymentSessionId = await createOrder(orderId, orderAmount, orderCurrency, customerId, customerPhone);

        const response = await req.user.createPayment({
            orderId,
            paymentSessionId,
            orderAmount,
        });

        res.status(201).json(response);

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.Try again!' })
        console.log("Error: ", error.message);
    }
}

const getPaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const orderStatus = await paymentStatus(orderId);
        const order = await Payment.findOne({ where: { orderId } });
        order.paymentStatus = orderStatus;
        order.save();
        res.status(200).json({ message: "Payment status updated successfully" });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.Try again!' })
        console.log("Error: ", error.message);
    }
}

module.exports = {
    processPayment,
    getPaymentStatus
}