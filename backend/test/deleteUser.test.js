import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import app from "../server.js";

const prisma = new PrismaClient();

describe("Delete User API", () => {
  test("successfully deletes user by id", async () => {
    const createdUser = await prisma.user.create({
      data: {
        username: "testuser",
        email: "test@gmail.com",
        password: "hashedpassword",
      },
    });

    const token = jwt.sign(
      { id: createdUser.id },
      process.env.JWT_SECRET, // now it exists
      { expiresIn: "1h" },
    );

    const res = await request(app)
      .delete(`/api/delete-user/${createdUser.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user.id).toBe(createdUser.id);
  });
});
