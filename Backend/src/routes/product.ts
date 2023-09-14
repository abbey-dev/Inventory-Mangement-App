import express from "express";
import { Request, Response } from "express";
import ProductModel from "../Models/product";
import mongoose from "mongoose";
import { Product as IProduct, Product } from "../Interfaces/IProduct";
import { faker } from "@faker-js/faker";

const router = express.Router();

// endpoint to get all products
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    if (!products)
      res
        .status(404)
        .json({ success: false, message: "Could not find proudcts" });
    res.status(201).send({ data: products });
  } catch (error) {
    res.status(500).send(error);
  }
});

// endpoint to get total amount of products on db
router.get("/count", async (req: Request, res: Response) => {
  const productCount = await ProductModel.countDocuments();
  if (!productCount) {
    res
      .status(404)
      .json({ success: false, message: "Could not fetch proudcts" });
  }
  res.status(200).send({ count: productCount });
});

// endpoint to get a particular product
router.get("/:id", async (req: Request, res: Response) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Id");
  }
  try {
    const response = await ProductModel.findById(req.params.id);
    if (!response)
      return res
        .status(404)
        .json({ success: false, message: "Could not fetch product" });
    return res.status(200).send({ data: response });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
});

// endpoint to create a single product
router.post("/", async (req: Request, res: Response) => {
  const _product: IProduct = req.body;
  const product = new ProductModel(_product);
  try {
    const response = await product.save();
    if (!response) return res.status(400).send("Resource not found");
    return res.status(200).json({ data: response });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
});

// endpoint to create bulk products
router.post("/bulk", async (req: Request, res: Response) => {
  const amount = req.body.amount;
  if (!amount) {
    return res.status(400).send({
      message: "Amount of product to be created needs to be specified",
    });
  }
  try {
    const products: Product[] = [];
    for (let i = 0; i < amount; i++) {
      const product: Product = {
        count: faker.helpers.rangeToNumber({ max: 500, min: 10 }),
        description: faker.commerce.productDescription(),
        productName: faker.commerce.productName(),
        productPrice: +faker.commerce.price({ dec: 0 }),
      };

      products.push(product);
    }
    ProductModel.insertMany(products);
    return res.status(200).send({
      count: products.length,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
});

// endpoint to update a product
router.patch("/:id", async (req: Request, res: Response) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Id");
  }
  const product: IProduct = req.body;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      product,
      { new: true }
    );

    if (!updatedProduct)
      return res
        .status(400)
        .send({ error: "Resource not found", success: false });
    return res.status(200).send({ data: updatedProduct });
  } catch (error) {
    return res.status(400).json({ success: false, error: "" });
  }
});

// endpoint to delete a product
router.delete("/:id", async (req: Request, res: Response) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Id");
  }
  try {
    const response = await ProductModel.findByIdAndDelete(req.params.id);
    if (!response)
      return res
        .status(404)
        .json({ success: false, message: "Could not find product" });
    return res
      .status(200)
      .json({ success: true, message: `product was succesfully deleted` });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});

export default router;
