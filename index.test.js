const server = require("./index.js");
const superTest = require("supertest");
const db = require('./database/dbConfig');

beforeEach(async ()=>{
    db.seed.run()
})

test("should return  Username and/Or password is undefined if password/username is undefined", async () => {
  const response = await superTest(server)
    .post("/api/auth/login")
    .send({
      password: "lalal"
    });
  expect(response.status).toBe(404)
  expect(response.body).toEqual({
    message: "Username and/Or password is undefined"
  });
});

test('Test register endpoint', async () => {
    
    const response = await superTest(server)
    .post("/api/auth/register")
    .send({
        "username": "newUsers",
        "password": "NewPassword"
    });
    expect(response.status).toBe(201);
    expect(response.header['content-type']).toEqual('application/json; charset=utf-8');
})

