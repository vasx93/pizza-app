const mongoose = require('moongoose');

const userSchema = new mongoose.Schema(
	{
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

		email: {
			type: String,
			trime: true,
			unique: true,
		},

		password: {
			type: String,
			required: true,
			trim: true,
		},

		phone: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},

		role: {
			type: String,
			enum: ['user', 'admin'],
		},

		orders: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Order',
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
