const Ingredient = require('../../models/Ingredient');

const getAllIngredients = async (req, res) => {
	try {
		const ings = await Ingredient.find();

		res.status(200).send({ results: ings.length, ings });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

module.exports = {
	getAllIngredients,
};
