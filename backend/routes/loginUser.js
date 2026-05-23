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

      const cleanedName = value.trim().replace(/\s+/g, " ");

      return isLower ? cleanedName.toLowerCase() : cleanedName;
    };

    const username = cleanName(req.body.username || req.body.email, true);

    const password = req.body.password?.trim();

    // validation
    if (!username) {
      return res.status(400).json({
        field: "username",
        message: "Username or email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        field: "password",
        message: "Password is required",
      });
    }

    // find user
    const existUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email: username }],
      },
    });

    // user not found
    if (!existUser) {
      return res.status(404).json({
        field: "username",
        message: "Username or email does not exist",
      });
    }

    // compare password
    const comparePassword = await bcrypt.compare(password, existUser.password);

    // password incorrect
    if (!comparePassword) {
      return res.status(401).json({
        field: "password",
        message: "Password is incorrect",
      });
    }

    // generate token
    const token = generateToken(existUser);

    // remove password before sending
    const { password: _, ...safeUser } = existUser;

    return res.status(200).json({
      token,
      user: safeUser,
      message: "Successfully logged in",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error with login request",

      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
