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

		items: [
			{
				_id: false,
				name: String,
				price: Number,
			},
		],

		size: String,

		total: Number,

		finishedAt: String,

		timeNeeded: Number,

		status: {
			type: String,
			default: 'Order placed',
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
