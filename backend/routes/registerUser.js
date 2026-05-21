import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/register-user", async (req, res) => {
  try {
    const cleanString = (value, toLower = false) => {
      if (typeof value !== "string") return "";
      let cleaned = value.trim().replace(/\s+/g, " ");
      return toLower ? cleaned.toLowerCase() : cleaned;
    };
    const username = cleanString(req.body.username, true);
    const email = cleanString(req.body.email, true);
    const password = req.body.password?.trim();
    const rePassword = req.body.rePassword?.trim();

    const fields = { username, email, password, rePassword };

    // if  one of field is empty

    for (const [key, value] of Object.entries(fields)) {
      if (!value) {
        return res.status(400).json({
          message: `${key} field is required`,
        });
      }
    }
    // if user exist

    const existUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
    if (existUser) {
      return res.status(500).json({
        message: "User is already exist Please Login",
      });
    }
    if (password != rePassword) {
      return res.status(500).json({
        message: "password doesnot matched",
      });
    }
    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return res.status(200).json({
      user: newUser,
      message: "Successfully added User",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Error with GET users request",
    });
  }
});

export default router;
