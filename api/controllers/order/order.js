const Order = require('../../models/Order');
const Status = require('../../models/Status');
const INGREDIENTS_LIST = require('../../../ingredients.json');

require('../../utils/jobQueue');
const { placeOrder } = require('../../utils/serveJob');

const PIZZA_SIZE = [
	{
		size: 'small',
		price: 200,
		time: 1000,
	},
	{
		size: 'medium',
		price: 400,
		time: 2000,
	},
	{
		size: 'large',
		price: 600,
		time: 3000,
	},
];
const createOrder = async (req, res) => {
	const { firstName, lastName, address, phone } = req.body;

	try {
		let orderArray = [];

		const pizza_base = PIZZA_SIZE.find(item => item.size === req.body.size);

		let ms = pizza_base.time + 3000;
		let total = pizza_base.price;

		const ingredients = [...new Set(req.body.ingredients)];

		if (!ingredients) {
			return res.status(422).send();
		}

		ingredients.forEach(el => {
			let match = INGREDIENTS_LIST.find(item => item.name === el);
			if (match) {
				let itemObj = { name: match.name, price: match.price };
				orderArray.push(itemObj);
				ms += match.time;
				total += match.price;
			}
		});

		const order = await Order.create({
			customer: req.user._id,
			firstName,
			lastName,
			address,
			phone,
			items: orderArray,
			size: pizza_base.size,
			total,
			timeNeeded: ms,
		});

		if (!order) {
			return res.status(400).send();
		}
		await Status.create({ order: order._id });

		await placeOrder(order);

		res.status(201).json({ done: true, message: 'Order placed' });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

const cancelOrder = async (req, res) => {
	try {
		await Status.findByIdAndUpdate(req.params.id, {
			status: 'Canceled',
		});

		await Order.findByIdAndDelete(req.params.id);

		res.status(200).send({ message: 'Order cancelled' });
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
	cancelOrder,
	createOrder,
	getAllOrders,
};
