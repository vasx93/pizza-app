require('dotenv').config();
const mongoose = require('mongoose');
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

mongoose
	.connect(process.env.DB, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log('MongoDB connection successful..'))
	.catch(err => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`app is live on port ${port}`);
});
