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
			default: '',
		},

		address: {
			type: String,
			default: '',
		},

		status: {
			type: String,
			default: 'Order placed',
		},

		total: Number,

		orderedAt: Date,

		size: String,

		items: [
			{
				name: String,
				price: Number,
				time: Number,
			},
		],
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
