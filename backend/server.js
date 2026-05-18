import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import getUsers from "./routes/getUser.js";

dotenv.config();
const app = express();
app.use(express.json());

const Port = process.env.PORT || 5450;

app.use("/api", getUsers);

if (process.env.NODE_ENV !== "test") {
  app.listen(Port, () => {
    console.log(`Server running at http://localhost:${Port}`);
  });
}

export default app;
