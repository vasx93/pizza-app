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

		let ms = 0;
		let total = 0;

		const size = PIZZA_SIZE.find(item => item.size === req.body.size);

		ms += size.time;
		total += size.price;

		req.body.ingredients.forEach(el => {
			let match = INGREDIENTS_LIST.find(item => item.name === el);
			if (match) {
				let itemObj = { name: match.name, price: match.price };
				orderArray.push(itemObj);
				ms += match.time;
				total += match.price;
			}
		});
		// console.log(orderArray, ms, total);

		const ORDER = Order.create({
			customer: req.user,
			firstName,
			lastName,
			address,
			phone,
			total,
			size: size.size,
			items: orderArray,
			orderedAt: new Date(Date.now()).toLocaleTimeString(),
		});
		console.log(ORDER, 'order_placed but not complete');

		const id = setTimeout(async () => {
			await ORDER;
			console.log('finished order in ', ms);
		}, ms);

		//TODO setTimoue ostavlja pending promise, ne cuva se u bazu vec prelaci na res.send...moraju se koristiti soketi

		//TODO takodje srediti count, da broji i cuva u bazu koriscenje odredjenih sastojaka
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
