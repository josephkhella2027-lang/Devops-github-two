import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import generateToken from "../middleware/generateToken.js";
const prisma = new PrismaClient();
const router = express.Router();

router.post("/login-user", async (req, res) => {
  try {
    const cleanName = (value, isLower = false) => {
      if (typeof value !== "string") return "";
      let cleanedName = value.trim().replace(/\s+/g, " ");
      return isLower ? cleanedName.toLowerCase() : cleanedName;
    };
    const username = cleanName(req.body.username || req.body.email, true);
    const email = cleanName(req.body.email, true);
    const password = req.body.password.trim();
    const fields = {
      username: username,
      password,
    };

    // if field is empty

    for (const [key, value] of Object.entries(fields)) {
      if (!value) {
        return res.status(400).json({
          message: `${key} field is required`,
        });
      }
    }

    // find exist user
    const existUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: username }],
      },
    });

    if (!existUser) {
      return res.status(500).json({
        message: "Username name or Email is not exist",
      });
    }
    // compare password
    const comparePassword = await bcrypt.compare(password, existUser.password);
    if (!comparePassword) {
      return res.status(500).json({
        message: "Password is not matched",
      });
    }
    const token = generateToken(existUser);

    return res.status(200).json({
      token,
      user: existUser,
      message: "Successfully Logged in",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Error with GET users request",
    });
  }
});

export default router;
