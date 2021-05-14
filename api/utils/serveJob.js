const Queue = require('bee-queue');

const options = {
	removeOnSuccess: true,
	redis: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		password: process.env.DB_PASS,
	},
};

const cookQueue = new Queue('cook', options);
const serveQueue = new Queue('serve', options);

const placeOrder = order => {
	return cookQueue.createJob(order).save();
};

serveQueue.process((job, done) => {
	done();
});

module.exports.placeOrder = placeOrder;
