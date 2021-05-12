const User = require('../../models/User');
const Order = require('../../models/Order');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
	try {
		const user = await User.create({ ...req.body });

		if (!user) {
			return res.status(400).send();
		}

		const token = jwt.sign(
			{ _id: user._id.toString() },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		);
		user.token = token;

		await user.save({ runValidators: true, new: true });

		res
			.status(201)
			.send({ message: 'User created successfully!', user, token });
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};
const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).send();
		}
		const match = await bcrypt.compare(password, user.password);

		if (!match) {
			return res.status(404).send();
		}

		const token = jwt.sign(
			{ _id: user._id.toString() },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		);

		user.token = token;
		await user.save({ runValidators: true, new: true });

		res.status(200).send({ message: 'Login successful', user, token });
	} catch (err) {
		res.status(401).send(err);
	}
};

const readProfile = async (req, res) => {
	try {
		res.status(200).send(req.user);
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

module.exports = {
	register,
	login,
	readProfile,
};
