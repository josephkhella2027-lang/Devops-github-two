import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());

const Port = process.env.PORT || 5450;

app.listen(Port, () => {
  console.log(` server is running http://localhost:${Port}/`);
});
