const { parentPort, workerData } = require('worker_threads');

const factorial = (chunk) => chunk.reduce((total, curr) => total * curr, 1n);

const result = factorial(workerData.chunk);

parentPort.postMessage(result);
