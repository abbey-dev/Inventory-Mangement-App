// db credentials
import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/product";
require("dotenv/config");
const cors = require("cors");
const morgan = require("morgan");

// app
const app = express();

app.listen("8080", () => {
  console.log("Application started on port 8080");
});

// middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan("dev"));
//app.use(logger);

// controllers
app.use(`/api/v1/products`, productRouter);
app.get("/", (_, res) => {
  console.log("Hello world");
  return res.status(200).send("Welcome to my inventory");
});

// db connection
mongoose
  .connect(process.env.MONGO_KEY!, {
    dbName: "Inventory",
  })
  .then(() => console.log("Database successfully connected"))
  .catch((error) => console.log("me", error));
