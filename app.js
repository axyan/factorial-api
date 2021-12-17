const express = require('express');
const os = require('os');

const utils = require('./utils');

const CPU_COUNT = os.cpus().length;

const app = express();

app.get('/', (req, res, next) => {
  const payload = [];
  payload.push('Factorial API <br/>');
  payload.push('Usage:');
  payload.push('/benchmark/:n --> To compare performance of /thread/:n and /threads/:n');
  payload.push('/thread/:n --> To run factorial using a single thread');
  payload.push('/threads/:n --> To run factorial using multiple threads <br/>');
  payload.push('Example: localhost:3000/benchmark/100000');
  
  res.send(payload.join('<br/>'));
});

app.get('/benchmark/:n', async (req, res, next) => {
  try {
    const [resultSingle, timeSingle] = utils.factorialSingleThread(req.params.n);
    const [resultMulti, timeMulti] = await utils.factorialMultiThread(req.params.n);

    const diffTime = timeSingle - timeMulti;

    const payload = [];
    payload.push('Single Thread');
    payload.push(`Factorial ${req.params.n}: ${resultSingle} <br/> Thread(s): 1 <br/> Elapsed time: ${timeSingle}ms <br/>`);
    payload.push('Multiple Threads');
    payload.push(`Factorial ${req.params.n}: ${resultMulti} <br/> Thread(s): ${CPU_COUNT} <br/> Elapsed time: ${timeMulti}ms <br/>`);
    payload.push(`Multithreading is faster by: ${diffTime}ms`);

    res.send(payload.join('<br/>'));
  } catch (e) {
    console.error(e);
  }
});

app.get('/thread/:n', (req, res, next) => {
  const [result, totalTime] = utils.factorialSingleThread(req.params.n);
  res.send(`Factorial ${req.params.n}: ${result} <br/> Thread(s): 1 <br/> Elapsed time: ${totalTime}ms`);
});

app.get('/threads/:n', async (req, res, next) => {
  try {
    const [result, totalTime] = await utils.factorialMultiThread(req.params.n);
    res.send(`Factorial ${req.params.n}: ${result} <br/> Thread(s): ${CPU_COUNT} <br/> Elapsed time: ${totalTime}ms`);
  } catch (e) {
    console.error(e);
  }
});

module.exports = app;
