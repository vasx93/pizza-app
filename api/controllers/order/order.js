const Order = require('../../models/Order');
const Ingredient = require('../../models/Ingredient');

const createOrder = async (req, res) => {
	try {
		console.log(req.body);
		// const order = await Order.create({ ...req.body });

		res.status(201).send({ message: 'Order placed!' });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find();

		res.status(200).send({ results: orders.length, orders });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

module.exports = {
	createOrder,
	getAllOrders,
};
