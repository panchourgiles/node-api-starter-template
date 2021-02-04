process.env.NODE_ENV = 'test';
import { request, startApp } from '@test/utils/common';

let app;

beforeAll(async () => {
  app = await startApp();
});

describe('Index route', () => {
  it('Should return a message with API is ready', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Api is ready');
  });
});
