const { Worker } = require('worker_threads');
const os = require('os');
const path = require('path');

const CPU_COUNT = os.cpus().length;
const WORKER_PATH = path.resolve('factorialWorker.js');

const MS_PER_SEC = 1e3;
const NS_PER_MS = 1e6;

/**
 * Calculates factorial synchronously using default single thread
 */

exports.factorialSingleThread = (n) => {
  const start = process.hrtime();

  const nums = [];
  for (let i = 1n; i <= n; i++) {
    nums.push(i);
  }

  const result = nums.reduce((total, curr) => total * curr, 1n);
  const elapsedTime = process.hrtime(start);
  const totalTime = elapsedTime[0] * MS_PER_SEC + elapsedTime[1] / NS_PER_MS;

  return [result, totalTime];
};

/**
 * Calculates factorial asynchronously using multiple threads
 * equal to the number of available CPU cores
 */

exports.factorialMultiThread = async (n) => {
  const start = process.hrtime();
  
  const nums = [];
  for (let i = 1n; i <= n; i++) {
    nums.push(i);
  }

  // Create chunks to separate factorial calculation for workers
  const chunkSize = Math.ceil(n / CPU_COUNT);
  const chunks = [];

  for (let i = 0; i < CPU_COUNT; i++) {
    let start = i * chunkSize;
    let end = start + chunkSize;
    let chunk = nums.slice(start, end);
    chunks.push(chunk);
  }

  // Create workers that calculate a chunk of the overall factorial calculation
  const promises = chunks.map((chunk) => {
    return new Promise((resolve, reject) => {
    const worker = new Worker(WORKER_PATH, { workerData: { chunk } });

      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (exitCode) => {
        if (exitCode !== 0) reject(new Error(`Worker exited with exit code ${exitCode}`));
      });
    });
  });

  const results = await Promise.all(promises)
  // Perform remaining factorial calculations to get final result
  const result = results.reduce((total, curr) => total * curr, 1n);
  const elapsedTime = process.hrtime(start);
  const totalTime = elapsedTime[0] * MS_PER_SEC + elapsedTime[1] / NS_PER_MS;

  return [result, totalTime];
};
