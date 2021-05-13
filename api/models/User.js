const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

		passwordChangedAt: Date,

		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},

		orders: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Order',
			},
		],

		token: String,
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.methods.toJSON = function () {
	const user = this.toObject();

	delete user.password;
	delete user.passwordChangedAt;
	delete user.__v;
	delete user.id;
	delete user.createdAt;
	delete user.updatedAt;
	return user;
};

userSchema.pre('save', async function (next) {
	if (this.isModified('password') || this.isNew) {
		this.password = await bcrypt.hash(this.password, 6);
		this.passwordChangedAt = Date.now() - 1000;
	}
	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
