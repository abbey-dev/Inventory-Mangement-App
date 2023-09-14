import { Product } from "@/Interfaces/product";
import { Table, flexRender } from "@tanstack/react-table";
import React from "react";

interface props {
  ReactTable: Table<Product>;
}
export default function Index({ ReactTable }: props) {
  return (
    <div className="p-2">
      <table className="text-black text-sm bg-white w-full rounded-md">
        <thead>
          {ReactTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header, _) => (
                <th key={_}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {ReactTable.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-gray-100">
              {row.getVisibleCells().map((cell, _) => (
                <td className="p-3" key={_}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <section className="flex justify-center s items-center py-4 bg-white w-full">
        <button
          disabled={!ReactTable.getCanPreviousPage()}
          onClick={ReactTable.previousPage}
          className={`${
            !ReactTable.getCanPreviousPage() && "cursor-not-allowed"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="darkGray"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </button>
        <div className="text-gray-400 text-sm px-6">
          Showing page{" "}
          <span className="bg-[#325dfd] py-[2.5px] px-[5px] mx-1 rounded-sm text-xs text-white">
            {ReactTable.getState().pagination.pageIndex + 1}
          </span>{" "}
          of{" "}
          <span className="bg-[#e1e9fa] ml-1 py-[2.5px] px-[5px] rounded-sm text-xs text-[#325dfd]">
            {ReactTable.getPageCount()}
          </span>
        </div>
        <button
          disabled={!ReactTable.getCanNextPage()}
          onClick={ReactTable.nextPage}
          className={`${!ReactTable.getCanNextPage() && "cursor-not-allowed"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="darkGray"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </section>
    </div>
  );
}
