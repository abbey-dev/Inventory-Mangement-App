import React, { ChangeEvent } from "react";
import { TextArea, TextInput } from "@/components/Fields";
import { normaliseNumberFields as normalise } from "@/utils";
import { IFormElements } from "@/Interfaces/fields";
import { Product } from "@/Interfaces/product";

interface Props {
  handleChange: (event: ChangeEvent<IFormElements>) => void;
  editProduct: (item: Product) => void;
  onCancel: () => void;
  product: Product;
  loading?: boolean;
}

export default function Index({
  handleChange,
  editProduct,
  onCancel,
  product,
  loading,
}: Props) {
  return (
    <div className="bg-white md:w-[600px] px-12 py-5 rounded-md shadow-2xl m-auto text-black">
      <h2 className="text-lg font-bold mb-1">Product details</h2>
      <p className="text-sm text-gray-400">Please fill out the fields</p>
      <div className="flex flex-col space-y-4 mt-6">
        <TextInput
          label="Edit product name"
          placeholder="Product name"
          name="productName"
          onChange={handleChange}
          value={product.productName}
        />
        <TextArea
          label="Edit description"
          placeholder="Add few notes here"
          name="description"
          onChange={handleChange}
          value={product?.description}
        />
        <TextInput
          label="Edit product price"
          placeholder="Enter amount"
          type="number"
          name="productPrice"
          onChange={handleChange}
          value={normalise(product.productPrice)}
          min={1}
        />
        <TextInput
          label="Edit product count"
          placeholder="Enter count"
          type="number"
          name="count"
          onChange={handleChange}
          value={normalise(product.count)}
          min={1}
        />
      </div>
      <div className="flex mt-6 justify-end space-x-2">
        <button className="px-6 py-3 bg-gray-200" onClick={onCancel}>
          Cancel
        </button>
        <button
          className={`w-28 justify-center flex  py-3 bg-black text-white`}
          onClick={() => editProduct(product)}
        >
          {loading ? (
            <div className="animate-spin self-center rounded-full h-6 w-6 border-y-2 border-white" />
          ) : (
            <h1>Edit Product</h1>
          )}
        </button>
      </div>
    </div>
  );
}
