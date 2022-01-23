const supertest = require('supertest');

const app = require('../../app');

const request = supertest(app);

test('should return 200 success', async () => {
  const response = await request.get('/api/v1/tours').expect(200);
  // const response = 200;
  expect(response.body.message).toBe('it works!');
  // expect(response).toBe(200);
});
