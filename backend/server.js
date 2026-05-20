import dotenv from "dotenv";
dotenv.config(); // MUST be first
import express from "express";
import cors from "cors";
import getUsers from "./routes/getUser.js";
import registerUser from "./routes/registerUser.js";
import loginUser from "./routes/loginUser.js";
import deleteUser from "./routes/deleteUser.js";
import updateUser from "./routes/updateUser.js";

const app = express();
app.use(express.json());
app.use(cors());

const Port = process.env.PORT || 5450;

app.use("/api", getUsers);
app.use("/api", registerUser);
app.use("/api", loginUser);
app.use("/api", deleteUser);
app.use("/api", updateUser);

if (process.env.NODE_ENV !== "test") {
  app.listen(Port, () => {
    console.log(`Server running at http://localhost:${Port}`);
  });
}

export default app;
