import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../server.js";

describe("Users API", () => {
  test("GET /api/users returns 200", async () => {
    const res = await request(app).get("/api/users");

    expect(res.statusCode).toBe(200);
  });

  test("GET /api/users returns users array", async () => {
    const res = await request(app).get("/api/users");

    expect(res.body).toHaveProperty("users");
    expect(Array.isArray(res.body.users)).toBe(true);
  });

  test("GET /api/users returns message", async () => {
    const res = await request(app).get("/api/users");

    expect(res.body).toHaveProperty("message");
    expect(typeof res.body.message).toBe("array");
  });

  test("Each user has correct properties", async () => {
    const res = await request(app).get("/api/users");

    if (res.body.users.length > 0) {
      const user = res.body.users[0];

      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("username");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("password");
      expect(user).toHaveProperty("createdAt");
    }
  });
});
