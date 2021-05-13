const Order = require('../../models/Order');
const Ingredient = require('../../models/Ingredient');
const INGREDIENTS_LIST = require('../../../ingredients.json');

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

		let ms = pizza_base.time;
		let total = pizza_base.price;

		req.body.ingredients.forEach(el => {
			let match = INGREDIENTS_LIST.find(item => item.name === el);
			if (match) {
				let itemObj = { name: match.name, price: match.price };
				orderArray.push(itemObj);
				ms += match.time;
				total += match.price;
			}
		});
		console.log(orderArray, ms, total);

		function setTime(added = 0) {
			return new Date(Date.now() + added).toLocaleTimeString();
		}

		const order = await Order.create({
			customer: req.user,
			firstName,
			lastName,
			address,
			phone,
			items: orderArray,
			size: pizza_base.size,
			total,
			finishedAt: setTime(ms),
			timeNeeded: ms,
		});

		//TODO takodje srediti count, da broji i cuva u bazu koriscenje odredjenih sastojaka

		//TODO porudzbine rade, treba koristiti sokete za real time

		res.status(201).send({ message: 'Order placed!', order });
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
