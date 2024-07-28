import express from "express";
import dotenv from "dotenv";
dotenv.config();
import Connection from "./DB/Connection.js";
import route from "./Route/Default.js";
import cors from "cors";
import errorHandler from "./Middleware/error.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(route);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

Connection(process.env.MONGODBURL);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
