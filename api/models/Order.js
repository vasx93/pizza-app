const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
	{
		customer: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},

		firstName: {
			type: String,
			required: true,
			trim: true,
			minlength: 1,
			maxlength: 29,
		},

		lastName: {
			type: String,
			required: true,
			trim: true,
			minlength: 1,
			maxlength: 49,
		},

		phone: {
			type: String,
			required: true,
		},

		address: {
			type: String,
			required: true,
		},

		status: {
			type: String,
			default: 'Order placed',
		},

		timeLeft: {
			type: Date,
		},

		items: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Ingredient',
				required: true,
			},
		],
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
