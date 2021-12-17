const request = require('supertest');

const app = require('./app');

const factorial = (n) => {
  if (n == 1) { return 1n; }
  return BigInt(n) * factorial(n - 1);
};

describe('GET /benchmark/:n', () => {
  test('should benchmark factorial 10', async () => {
    const res = await request(app)
      .get('/benchmark/10')
      .expect(200);
  
    const strings = res.text.split(' ');
    const singleResult = strings[3];
    const multiResult = strings[14];
    expect(singleResult).toEqual(factorial(10).toString());
    expect(singleResult).toEqual(multiResult);
  });
});

describe('GET /thread/:n', () => {
  test('should calculate factorial 14', async () => {
    const res = await request(app)
      .get('/thread/14')
      .expect(200);

    const factorialResult = res.text.split(' ')[2];
    expect(factorialResult).toEqual(factorial(14).toString());
  });
});

describe('GET /threads/:n', () => {
  test('should calculate factorial 99', async () => {
    const res = await request(app)
      .get('/threads/99')
      .expect(200);

    const factorialResult = res.text.split(' ')[2];
    expect(factorialResult).toEqual(factorial(99).toString());
  });
});
