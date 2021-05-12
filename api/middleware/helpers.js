const User = require('../models/user');
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

			const user = await User.findOneById(decoded._id);

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

	// only for rendered pages -> no errors
	async isLoggedIn(req, res, next) {
		if (req.cookies.jwt) {
			try {
				const token = req.cookies.jwt;
				const user = await User.validateToken(token);

				if (!user || !token) {
					return next();
				}
				// User is logged in (no errors)
				// res.locals variables are available in PUG
				res.locals.user = user;
				return next();
			} catch (e) {
				return next();
			}
		}
		next();
	},
};
