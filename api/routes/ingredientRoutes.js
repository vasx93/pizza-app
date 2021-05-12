const express = require('express');
const router = express.Router();

const { getAllIngredients } = require('../controllers/ingredient/ingredient');

router.get('/', getAllIngredients);

module.exports = router;
