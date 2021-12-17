const request = require('supertest');

const app = require('./app');

const factorial = (n) => {
  if (n == 1) { return 1; }
  return n * factorial(n - 1);
};

const FACTORIAL_10 = factorial(10).toString();

describe('GET /benchmark/:n', () => {
  test('should benchmark factorial 10', async () => {
    const res = await request(app)
      .get('/benchmark/10')
      .expect(200);
  
    const strings = res.text.split(' ');
    const singleResult = strings[3];
    const multiResult = strings[14];
    expect(singleResult).toEqual(FACTORIAL_10);
    expect(singleResult).toEqual(multiResult);
  });
});

describe('GET /thread/:n', () => {
  test('should calculate factorial 10', async () => {
    const res = await request(app)
      .get('/thread/10')
      .expect(200);

    const factorialResult = res.text.split(' ')[2];
    expect(factorialResult).toEqual(FACTORIAL_10);
  });
});

describe('GET /threads/:n', () => {
  test('should calculate factorial 10', async () => {
    const res = await request(app)
      .get('/threads/10')
      .expect(200);

    const factorialResult = res.text.split(' ')[2];
    expect(factorialResult).toEqual(FACTORIAL_10);
  });
});
