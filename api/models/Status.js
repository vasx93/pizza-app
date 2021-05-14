const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema(
	{
		order: {
			type: mongoose.Schema.ObjectId,
			ref: 'Order',
			required: true,
		},

		status: {
			type: String,
			default: 'Order placed',
		},
	},
	{ timestamps: true }
);

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
