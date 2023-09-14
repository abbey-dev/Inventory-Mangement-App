import React, { ChangeEvent, useState } from "react";
import { TextArea, TextInput } from "@/components/Fields";
import { IFormElements } from "@/Interfaces/fields";

interface Props {
  handleChange: (event: ChangeEvent<IFormElements>) => void;
  addBulkProducts: (count: number) => void;
  addProducts: () => void;
  disableMilestoneButton: boolean;
  onCancel: () => void;
  loading?: boolean;
}

export default function Index({
  handleChange,
  addProducts: addMileStone,
  disableMilestoneButton,
  addBulkProducts: handleBulkCount,
  onCancel,
  loading,
}: Props) {
  const [nav, setNav] = useState<"single" | "bulk">("single");
  const [count, setCount] = useState(10);
  return (
    <div className="bg-white px-12 py-5 shadow-2xl m-auto text-black">
      <h2 className="text-lg font-bold mb-1">Product details</h2>
      <p className="text-sm text-gray-400 pb-4">Please fill out the fields</p>
      <div className="flex text-sm font-semibold">
        <button
          onClick={() => setNav("single")}
          className={`p-4 ${nav == "single" && "bg-gray-200"}`}
        >
          Single{" "}
        </button>
        <button
          onClick={() => setNav("bulk")}
          className={`p-4 ${nav == "bulk" && "bg-gray-200"}`}
        >
          Bulk
        </button>
      </div>
      {nav == "single" && (
        <div className="flex flex-col space-y-4 mt-6">
          <TextInput
            label="Give this product a name"
            placeholder="Milestone name"
            name="productName"
            onChange={handleChange}
          />
          <TextArea
            label="Description"
            placeholder="Add few notes here"
            name="description"
            onChange={handleChange}
          />
          <TextInput
            label="Amount to pay"
            placeholder="Enter amount"
            type="number"
            name="productPrice"
            onChange={handleChange}
            min={1}
          />
          <TextInput
            label="Product Count"
            placeholder="Enter product count"
            type="number"
            name="count"
            onChange={handleChange}
            min={1}
          />
        </div>
      )}
      {nav == "bulk" && (
        <div className="mt-6 mb-6">
          <TextInput
            label="Product Count"
            placeholder="Enter product count"
            type="number"
            name="bulkCount"
            onChange={(event) => {
              setCount(+event.target.value);
            }}
            min={1}
          />
        </div>
      )}
      <div className="flex mt-6 justify-end space-x-2">
        <button className="px-6 py-3 bg-gray-200" onClick={onCancel}>
          Cancel
        </button>
        <button
          className={`${
            disableMilestoneButton && "opacity-75 cursor-not-allowed"
          } w-28 justify-center flex py-3 bg-black text-white`}
          onClick={
            nav == "single" ? addMileStone : () => handleBulkCount(count)
          }
          disabled={disableMilestoneButton || (nav == "bulk" && !count)}
        >
          {loading ? (
            <div className="animate-spin self-center rounded-full h-6 w-6 border-y-2 border-white" />
          ) : (
            <h1>Add Product</h1>
          )}
        </button>
      </div>
    </div>
  );
}
