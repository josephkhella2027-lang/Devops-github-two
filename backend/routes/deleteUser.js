import express from "express";
import { PrismaClient } from "@prisma/client";
import auth from "../middleware/authMiddleware.js";

const prisma = new PrismaClient();
const router = express.Router();

router.delete("/delete-user/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = Number(id);

    // if field is empty
    if (!id) {
      return res.status(400).json({
        message: "User id not defined",
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
        message: "User is not found",
      });
    }
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    // get All Users
    const users = await prisma.user.findMany();

    return res.status(200).json({
      users,
      user: deletedUser,
      message: "User Successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Error with GET users request",
    });
  }
});

export default router;
