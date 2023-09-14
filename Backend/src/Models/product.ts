import { Schema, model } from "mongoose";
import { Product } from "../Interfaces/IProduct";

// Database schema with mongoose orm
const productSchema = new Schema<Product>({
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

export default model<Product>("Product", productSchema);
