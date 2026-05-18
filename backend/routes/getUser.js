import express from "express";
import users from "../util/usersArray.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    return res
      .status(200)
      .json({ users, message: "Successfully run get request " });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "error with get user request" });
  }
});

export default router;
