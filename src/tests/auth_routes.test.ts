import request from "supertest";
import app from "../server";
import mongoose from "mongoose";
import User from "../models/user_model";
import { StatusCodes } from "http-status-codes";

const email = "test@a.com";
const wrongEmail = "test2@a.com";
const password = "1234567890";
const wrongPassword = "44444444";
let accessToken = "";
let refreshToken = "";
let retId = "";


const sleep = (ms:number) => new Promise((r) => setTimeout(r, ms));


beforeAll(async () => {
  //set the token expiration to 3 sec so it will expire for the refresh test.
  process.env.TOKEN_EXPIRATION = '3s'
  
  // clear Posts collection
  await User.deleteMany({ email: email });
});

afterAll(async () => {
  await User.deleteMany({ email: email });
  mongoose.connection.close();
});

describe("This is Auth API test", () => {
  test("Test register API", async () => {
    let response = await request(app)
      .post("/auth/register")
      .send({ email: email, password: password });
    expect(response.statusCode).toEqual(200);
    retId = response.body._id;
    accessToken = response.body.access_token;
    refreshToken = response.body.refresh_token;
    expect(accessToken).not.toBeNull();
    expect(refreshToken).not.toBeNull();

    response = await request(app)
      .get("/auth/test")
      .set({ authorization: "bearer " + accessToken });
    expect(response.statusCode).toEqual(200);
  });

  test("Test register fail API", async () => {
    let response = await request(app)
      .post("/auth/register")
      .send({ email: null, password: password });
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  })
  test("Test login API", async () => {
    let response = await request(app)
      .post("/auth/login")
      .send({ email: email, password: password });
    expect(response.statusCode).toEqual(200);

    accessToken = response.body.access_token;
    refreshToken = response.body.refresh_token;
    expect(accessToken).not.toBeNull();
    expect(refreshToken).not.toBeNull();

    response = await request(app)
      .get("/auth/test")
      .set({ authorization: "bearer " + accessToken });
    expect(response.statusCode).toEqual(200);
  });
  
  test("Test login fail API", async () => {
    let response = await request(app)
      .post("/auth/login")
      .send({ email: null, password: password });
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  })
  test("Test register taken email API", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({ email: email, password: password });
    expect(response.statusCode).not.toEqual(200);
  });

  test("Test login wrong email API", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ email: wrongEmail, password: password });
    expect(response.statusCode).not.toEqual(200);
  });

  test("Test login wrong password API", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ email: email, password: wrongPassword });
    expect(response.statusCode).not.toEqual(200);
  });


  test("test refresh token", async () => {
    //wait untill access token is expiered
    await sleep(3000);
    let response = await request(app)
      .get("/auth/test")
      .set({ authorization: "bearer " + accessToken });
    expect(response.statusCode).not.toEqual(200);

    response = await request(app)
      .get("/auth/refresh")
      .set({ authorization: "bearer " + refreshToken });
    expect(response.statusCode).toEqual(200);

    accessToken = response.body.access_token;
    refreshToken = response.body.refresh_token;
    expect(accessToken).not.toBeNull();
    expect(refreshToken).not.toBeNull();

    console.log("new access token " + accessToken)
    response = await request(app)
      .get("/auth/test")
      .set({ authorization: "bearer " + accessToken });
    expect(response.statusCode).toEqual(200);
  });

  test("test refresh fail token", async () => {
    //wait untill access token is expiered
    await sleep(3000);
    let response = await request(app)
      .get("/auth/test")
      .set({ authorization: "bearer " + accessToken });
    expect(response.statusCode).not.toEqual(200);

    response = await request(app)
      .get("/auth/refresh")
    expect(response.statusCode).not.toEqual(200);

  });

  test("test refresh token not same user", async () => {
    //wait untill access token is expiered
    await sleep(3000);
    let response = await request(app)
      .get("/auth/test")
      .set({ authorization: "bearer " + accessToken });
    expect(response.statusCode).not.toEqual(200);

    response = await request(app)
      .get("/auth/refresh")
      .set({ authorization: "bearer " + refreshToken });
    expect(response.statusCode).toEqual(200);

    accessToken = response.body.access_token;
    refreshToken = response.body.refresh_token;
    expect(accessToken).not.toBeNull();
    expect(refreshToken).not.toBeNull();

    console.log("new access token " + accessToken)
    response = await request(app)
      .get("/auth/test")
      .set({ authorization: "bearer " + accessToken });
    expect(response.statusCode).toEqual(200);
  });
/*
  test("Test logout API", async () => {
    // let response = await request(app).post("/auth/login").send({ email: email, password: password });
    // expect(response.statusCode).toEqual(200);

    let response = await request(app).delete('/auth/logout').set(retId)
    expect(response.statusCode).toEqual(StatusCodes.OK);
  })

  */
/*
  test("Test deleteByID API", async () => {
    // let response = await request(app).post("/auth/login").send({ email: email, password: password });
    // expect(response.statusCode).toEqual(200);
    const response = await request(app).delete('auth/delete' + ID)
    expect(response.statusCode).toEqual(StatusCodes.OK)
   
  })
*/
});
