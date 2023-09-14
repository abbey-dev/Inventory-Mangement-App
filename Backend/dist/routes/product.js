"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../Models/product"));
const mongoose_1 = __importDefault(require("mongoose"));
const faker_1 = require("@faker-js/faker");
const router = express_1.default.Router();
// endpoint to get all products
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find();
        if (!products)
            res
                .status(404)
                .json({ success: false, message: "Could not find proudcts" });
        res.status(201).send({ data: products });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// endpoint to get total amount of products on db
router.get("/count", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productCount = yield product_1.default.countDocuments();
    if (!productCount) {
        res
            .status(404)
            .json({ success: false, message: "Could not fetch proudcts" });
    }
    res.status(200).send({ count: productCount });
}));
// endpoint to get a particular product
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid Id");
    }
    try {
        const response = yield product_1.default.findById(req.params.id);
        if (!response)
            return res
                .status(404)
                .json({ success: false, message: "Could not fetch product" });
        return res.status(200).send({ data: response });
    }
    catch (error) {
        return res.status(500).json({ success: false, error });
    }
}));
// endpoint to create a single product
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _product = req.body;
    const product = new product_1.default(_product);
    try {
        const response = yield product.save();
        if (!response)
            return res.status(400).send("Resource not found");
        return res.status(200).json({ data: response });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
}));
// endpoint to create bulk products
router.post("/bulk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const amount = req.body.amount;
    if (!amount) {
        return res.status(400).send({
            message: "Amount of product to be created needs to be specified",
        });
    }
    try {
        const products = [];
        for (let i = 0; i < amount; i++) {
            const product = {
                count: faker_1.faker.helpers.rangeToNumber({ max: 500, min: 10 }),
                description: faker_1.faker.commerce.productDescription(),
                productName: faker_1.faker.commerce.productName(),
                productPrice: +faker_1.faker.commerce.price({ dec: 0 }),
            };
            products.push(product);
        }
        product_1.default.insertMany(products);
        return res.status(200).send({
            count: products.length,
            success: true,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error,
        });
    }
}));
// endpoint to update a product
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid Id");
    }
    const product = req.body;
    try {
        const updatedProduct = yield product_1.default.findByIdAndUpdate(req.params.id, product, { new: true });
        if (!updatedProduct)
            return res
                .status(400)
                .send({ error: "Resource not found", success: false });
        return res.status(200).send({ data: updatedProduct });
    }
    catch (error) {
        return res.status(400).json({ success: false, error: "" });
    }
}));
// endpoint to delete a product
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid Id");
    }
    try {
        const response = yield product_1.default.findByIdAndDelete(req.params.id);
        if (!response)
            return res
                .status(404)
                .json({ success: false, message: "Could not find product" });
        return res
            .status(200)
            .json({ success: true, message: `product was succesfully deleted` });
    }
    catch (error) {
        return res.status(400).json({ success: false, error });
    }
}));
exports.default = router;
