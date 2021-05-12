const mongoose = require('moongoose');

const ingredientSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: [true, 'Ingredient must have a unique name'],
		minlength: 1,
		maxlength: 50,
	},

	price: {
		type: Number,
		required: true,
		min: 0,
	},

	time: {
		type: Number,
		required: true,
	},
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
