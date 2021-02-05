process.env.NODE_ENV = 'test';
import UserModel from '@components/user/model';
import { request, startApp } from '@test/utils/common';
import { closeDatabase, connectDatabase } from '@test/utils/db';

let app;

beforeAll(async () => {
  await connectDatabase();
  app = await startApp();
});

afterAll(async () => {
  await closeDatabase();
});

let mockUser = {
  name: 'Luke Skywalker',
  email: 'luke@starwars.com'
};

const mockUpdatedUser = {
  name: 'Obiwan Kenobi',
  email: 'obiwan@starwars.com'
};

describe('User routes', () => {
  it('Should create a new user and retrieve it back', async () => {
    const userCreated = await request(app).post('/users').send(mockUser);

    expect(userCreated.status).toBe(201);
    expect(userCreated.body).toEqual({
      meta: expect.any(Object),
      _id: expect.any(String),
      name: mockUser.name,
      email: mockUser.email
    });
    mockUser._id = userCreated.body._id;
  });

  it('Should return list of users', async () => {
    const usersResult = await request(app).get('/users');
    expect(usersResult.status).toBe(200);
    expect(usersResult.body.length).toBe(1);
    expect(usersResult.body[0].name).toBe(mockUser.name);
    expect(usersResult.body[0].email).toBe(mockUser.email);
  });

  it('Should return a single user', async () => {
    const userResult = await request(app).get(`/users/${mockUser._id}`);
    expect(userResult.status).toBe(200);
    expect(userResult.body.name).toBe(mockUser.name);
    expect(userResult.body.email).toBe(mockUser.email);
  });

  it('Should update a user and retrieve it back', async () => {
    const userResult = await request(app)
      .put(`/users/${mockUser._id}`)
      .send(mockUpdatedUser);
    expect(userResult.status).toBe(200);
    expect(userResult.body.name).toBe(mockUpdatedUser.name);
    expect(userResult.body.email).toBe(mockUpdatedUser.email);
  });

  it('Should delete a user', async () => {
    const userDeleted = await request(app).delete(`/users/${mockUser._id}`);
    expect(userDeleted.status).toBe(204);
    expect(userDeleted).toBeTruthy();
  });

  it('Should return with HTTP 422 status because the user id is invalid', async () => {
    const res = await request(app).get(`/users/INVALID_ID`);
    expect(res.status).toBe(422);
  });

  it('Should return with HTTP 404 status if updated resource is not found', async () => {
    const res = await request(app)
      .put(`/users/${mockUser._id}`)
      .send(mockUpdatedUser);
    expect(res.status).toBe(404);
  });

  it('Should return with HTTP 404 status if resource is not found', async () => {
    const res = await request(app).get(`/users/${mockUser._id}`);
    expect(res.status).toBe(404);
  });

  it('Should return with HTTP 500 status because the route does not exist', async () => {
    const res = await request(app).get('/ROUTE_NOT_EXISTING');
    expect(res.status).toBe(500);
  });

  it('Should return with HTTP 500 status because the findOne method of mongoose fails', async () => {
    jest
      .spyOn(UserModel, 'findOne')
      .mockImplementationOnce(() => Promise.reject('fail'));
    const userResult = await request(app).get(`/users/${mockUser._id}`);
    expect(userResult.status).toBe(500);
  });
});
