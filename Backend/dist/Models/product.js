"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Database schema with mongoose orm
const productSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"],
    },
    description: {
        type: String,
        required: false,
    },
    productPrice: {
        type: Number,
        default: 0,
    },
    count: {
        type: Number,
        required: [true, "Product count is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
productSchema.virtual("id").get(function () {
    return this._id.toHexString();
});
productSchema.set("toJSON", {
    virtuals: true,
});
exports.default = (0, mongoose_1.model)("Product", productSchema);
