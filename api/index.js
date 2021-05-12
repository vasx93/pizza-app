require('dotenv').config();
require('mongoose');
const path = require('path');
const express = require('express');
const compression = require('compression');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());

app.all('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`app is live on port ${port}`);
});
