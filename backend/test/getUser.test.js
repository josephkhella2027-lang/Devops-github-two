import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../server.js";

describe("Users API", () => {
  test("GET users returns 200", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
  });

  test("GET users returns object with users array", async () => {
    const res = await request(app).get("/api/users");

    expect(res.body).toHaveProperty("users");
    expect(Array.isArray(res.body.users)).toBe(true);
  });

  test("GET users is not empty", async () => {
    const res = await request(app).get("/api/users");

    expect(res.body.users.length).toBeGreaterThan(0);
  });
});
