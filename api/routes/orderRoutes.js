const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders } = require('../controllers/order/order');
const { checkToken } = require('../middleware/helpers');

router.post('/make-pizza', checkToken, createOrder);

router.get('/', getAllOrders);

module.exports = router;
