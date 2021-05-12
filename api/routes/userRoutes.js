const express = require('express');
const router = express.Router();
const { checkToken } = require('../middleware/helpers');

const {
	register,
	login,
	readProfile,
	getAllUsers,
} = require('../controllers/user/user');

router.post('/login', login);
router.post('/register', register);

router.get('/me', checkToken, readProfile);

router.get('/', getAllUsers);

module.exports = router;
