import request from "supertest";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import app from "../server.js";

const prisma = new PrismaClient();

describe("Delete User API", () => {
  test("successfully deletes user by id", async () => {
    // 1. CREATE A USER FIRST (guaranteed not null)
    const createdUser = await prisma.user.create({
      data: {
        username: "testuser",
        email: "test@gmail.com",
        password: "hashedpassword",
      },
    });

    // 2. CREATE VALID TOKEN
    const token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 3. CALL DELETE API
    const res = await request(app)
      .delete(`/api/delete-user/${createdUser.id}`)
      .set("Authorization", `Bearer ${token}`);

    // 4. ASSERT SUCCESS
    expect(res.statusCode).toBe(200);
    expect(res.body.user.id).toBe(createdUser.id);
  });
});
