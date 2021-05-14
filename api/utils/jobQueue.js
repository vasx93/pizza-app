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

cookQueue.process(15, (job, done) => {
	console.log(`Order will be done in ${job.data.timeNeeded}ms`);
	setTimeout(() => {
		done();
	}, job.data.timeNeeded);
});

cookQueue.on('succeeded', (job, result) => {
	serveQueue.createJob(job.data).save();
});
