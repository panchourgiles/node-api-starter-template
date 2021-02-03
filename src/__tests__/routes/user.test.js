import { startApp, request } from '@test/utils/common';
import UserModel from '@components/user/model';

let app;

beforeAll(async () => {
  app = await startApp();
  await UserModel.deleteMany();
});

let mockUser = {
  name: 'Luke Skywalker',
  email: 'luke@starwars.com'
};

describe('user route', () => {
  it('should create a new user and retrieve it back', async () => {
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

  it('should return the user created on the step before', async () => {
    const userResult = await request(app).get(`/users/${mockUser._id}`);
    expect(userResult.status).toBe(200);
    expect(userResult.body.name).toBe(mockUser.name);
    expect(userResult.body.email).toBe(mockUser.email);
  });

  it('should update the user created on the step before', async () => {
    const mockUpdateUser = {
      name: 'Obiwan Kenobi',
      email: 'obiwan@starwars.com'
    };
    const userResult = await request(app)
      .put(`/users/${mockUser._id}`)
      .send(mockUpdateUser);
    expect(userResult.status).toBe(200);
    expect(userResult.body.name).toBe(mockUpdateUser.name);
    expect(userResult.body.email).toBe(mockUpdateUser.email);
  });

  it('should delete user and return it', async () => {
    const userDeleted = await request(app).delete(`/users/${mockUser._id}`);
    expect(userDeleted.status).toBe(204);
    expect(userDeleted).toBeTruthy();
  });

  it('should return with HTTP 404 status because there is no user', async () => {
    const res = await request(app).get(`/users/${mockUser._id}`);
    expect(res.status).toBe(404);
  });
});
