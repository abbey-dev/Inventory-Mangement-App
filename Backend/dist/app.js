"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// db credentials
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_1 = __importDefault(require("./routes/product"));
require("dotenv/config");
const cors = require("cors");
const morgan = require("morgan");
// app
const app = (0, express_1.default)();
app.listen("8080", () => {
    console.log("Application started on port 8080");
});
// middleware
app.use(cors());
app.options("*", cors());
app.use(express_1.default.json());
app.use(morgan("dev"));
//app.use(logger);
// controllers
app.use(`/api/v1/products`, product_1.default);
app.get("/", (_, res) => {
    console.log("Hello world");
    return res.status(200).send("Welcome to my inventory");
});
// db connection
mongoose_1.default
    .connect(process.env.MONGO_KEY, {
    dbName: "Inventory",
})
    .then(() => console.log("Database successfully connected"))
    .catch((error) => console.log("me", error));
