import request from "supertest";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import app from "../server.js";

const prisma = new PrismaClient();

describe("Delete User API", () => {
  test("successfully deletes existing user by id", async () => {
    const user = await prisma.user.findFirst();

    expect(user).toBeDefined();

    // create fake valid token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const res = await request(app)
      .delete(`/api/delete-user/${user.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user.id).toBe(user.id);
  });
});
