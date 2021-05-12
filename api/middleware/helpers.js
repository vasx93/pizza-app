const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
	async checkToken(req, res, next) {
		try {
			if (
				!req.headers.authorization &&
				!req.headers.authorization.startsWith('Bearer')
			) {
				return res.status(401).send();
			}

			const token = req.headers.authorization.split(' ')[1];

			if (!token) {
				throw new Error();
			}

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			const user = await User.findOne({ _id: decoded._id });

			if (!user) {
				throw new Error();
			}

			req.token = token;
			req.user = user;

			next();
		} catch (err) {
			res.status(401).send();
		}
	},

	isAvailableFor(...roles) {
		return (req, res, next) => {
			if (!roles.includes(req.user.role)) {
				return res.status(401).send();
			}
			next();
		};
	},
};
