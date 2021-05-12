const express = require('express');
const router = express.Router();

const { createOrder, getAllOrders } = require('../controllers/order/order');

router.post('/make-pizza', createOrder);

router.get('/', getAllOrders);

module.exports = router;
