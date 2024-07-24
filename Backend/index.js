import express from "express";
import dotenv from "dotenv";
dotenv.config();
import Connection from "./DB/Connection.js";

const app = express();

const PORT = process.env.PORT || 8080;

Connection(process.env.MONGODBURL);

app.get("/", (req, res) => {
  res.json("success");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
