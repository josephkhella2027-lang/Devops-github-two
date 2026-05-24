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

    // 1. EMPTY FIELD VALIDATION (FIRST STEP)
    const emptyFields = Object.entries(fields)
      .filter(([_, value]) => typeof value !== "string" || value.trim() === "")
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      const allEmpty = emptyFields.length === Object.keys(fields).length;

      return res.status(400).json({
        field: emptyFields,
        message: allEmpty
          ? "All fields are required"
          : emptyFields.map(
              (f) =>
                `${f.charAt(0).toUpperCase() + f.slice(1)} field is required`,
            ),
      });
    }

    const existUserName = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    const existEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    // 3. COLLECT ERRORS
    const errors = [];

    if (existUserName) {
      errors.push({
        field: "username",
        message: "Username already exists",
      });
    }

    if (existEmail) {
      errors.push({
        field: "email",
        message: "Email already exists",
      });
    }

    if (password !== rePassword) {
      errors.push({
        field: "rePassword",
        message: "Passwords do not match",
      });
    }

    // 4. RETURN ALL ERRORS
    if (errors.length > 0) {
      return res.status(409).json({
        field: errors.map((e) => e.field),
        message: errors.map((e) => e.message),
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
