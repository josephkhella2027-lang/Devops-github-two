import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cors from "cors";
import getUsers from "./routes/getUser.js";

const app = express();
app.use(express.json());
app.use(cors());

const Port = process.env.PORT || 5450;

app.use("/api", getUsers);

if (process.env.NODE_ENV !== "test") {
  app.listen(Port, () => {
    console.log(`Server running at http://localhost:${Port}`);
  });
}

export default app;
