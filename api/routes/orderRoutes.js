const express = require('express');
const router = express.Router();
const {
	createOrder,
	getAllOrders,
	cancelOrder,
} = require('../controllers/order/order');
const { checkToken } = require('../middleware/helpers');

router.post('/make-pizza', checkToken, createOrder);

router.get('/cancel-order', checkToken, cancelOrder);

router.get('/', getAllOrders);

module.exports = router;
