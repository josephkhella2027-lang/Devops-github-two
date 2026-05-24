import express from "express";
import { PrismaClient } from "@prisma/client";
import auth from "../middleware/authMiddleware.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const router = express.Router();

router.put("/update-user/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = Number(id);

    // function for username and email will be sorted as to lowercase and no space
    const cleanName = (value, isLower = false) => {
      if (typeof value !== "string") return "";
      let cleanedName = value.trim().replace(/\s+/g, " ");
      return isLower ? cleanedName.toLowerCase() : cleanedName;
    };
    // variable  username , email , password

    const username = cleanName(req.body.username, true);
    const email = cleanName(req.body.email, true);
    const password = req.body.password?.trim();

    // if field is empty
    if (!id) {
      return res.status(400).json({
        message: ["User id not defined"],
      });
    }

    // find exist user
    const findUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      return res.status(404).json({
        message: ["User is not found"],
      });
    }
    // exist user
    const existUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
    if (existUser) {
      return res.status(400).json({
        message:
          ["username or email is already exist try to login or write another username or password"],
      });
    }

    // prepare update data
    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;

    // hashed password
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: updateData,
    });

    // get All Users
    const users = await prisma.user.findMany();

    return res.status(200).json({
      users,
      user: updatedUser,
      message: ["User Successfully updated"],
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: ["Error with update users request"],
    });
  }
});

export default router;
