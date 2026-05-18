import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    return res.status(200).json({
      users,
      message: "Successfully fetched users from database",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Error with GET users request",
    });
  }
});

export default router;
