import { IFormElements } from "@/Interfaces/fields";
import { Product } from "@/Interfaces/product";
import CreateProduct from "@/Modals/CreateProduct";
import EditProduct from "@/Modals/EditProduct";
import {
  createBulk,
  createProducts,
  deleteProduct,
  editProduct,
  getProducts,
} from "@/api/product";

import Modal from "@/components/Modal";
import ProductTable from "@/components/ProductTable";
import { Header } from "@/components/TableHeader";
import Toast from "@/components/Toast";
import { Notify } from "@/helpers/productHelper";
import { initialProduct } from "@/helpers/productHelper";
import { getYearFromDate, is2xxSuccessfull } from "@/utils";
import {
  ColumnDef,
  Row,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect, ChangeEvent, useMemo } from "react";

// Products page
export default function Home() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const columnHelper = createColumnHelper<Product>();
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(false);

  // fetch all products from db on startup
  async function fetchProducts() {
    setLoading(true);
    const response = await getProducts();
    setLoading(false);
    if (response.ok && is2xxSuccessfull(response?.status)) {
      Toast({
        message: "Products fetched successfully",
        type: "success",
      });
      setProducts(response.data?.data || []);
    } else {
      Toast({
        message: "Could not fetch products",
        type: "failure",
      });
    }
  }

  // memoized product table headers
  const columns = useMemo<ColumnDef<Product, any>[]>(
    () => [
      columnHelper.accessor("productName", {
        id: "Product name",
        header: (row) => <Header item={row.header.id} />,
        cell: ({ row }) => (
          <h1 className="capitalize">{row.getValue("Product name")}</h1>
        ),
      }),
      columnHelper.accessor((row) => row.productPrice, {
        id: "Product price",
        header: (row) => <Header item={row.header.id} />,
        cell: ({ row }) => {
          const price = row.original.productPrice;
          return (
            <h1>
              {price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </h1>
          );
        },
      }),
      columnHelper.accessor("createdAt", {
        id: "Created at",
        header: (row) => <Header item={row.header.id} />,
        cell: ({ row }) => <h2>{getYearFromDate(row.original.createdAt)}</h2>,
      }),
      columnHelper.accessor("count", {
        id: "Product count",
        header: (row) => <Header item={row.header.id} />,
      }),
      {
        id: "edit",
        header: () => null,
        cell: ({ row }: { row: Row<Product> }) => {
          return (
            <button
              className="bg-[#30cddbd5] text-xs h-6 w-14  rounded text-white"
              onClick={() => {
                setProduct(row.original);
                setShowEdit(true);
              }}
            >
              Edit
            </button>
          );
        },
      },
      {
        id: "delete",
        header: () => null,
        cell: ({ row }: { row: Row<Product> }) => {
          return (
            <button
              className="bg-[#db3630d5] text-xs h-6 w-14 rounded text-white"
              onClick={() => deleteProd(row.original.id!)}
            >
              Delete
            </button>
          );
        },
      },
    ],
    []
  );

  // delete a product
  async function deleteProd(id: string) {
    setLoading(true);
    const response = await deleteProduct(id);
    setLoading(false);
    Notify(response.ok && is2xxSuccessfull(response?.status), "Delete");
    fetchProducts();
  }

  // bulk create products
  async function bulkCreate(amount: number) {
    setLoading(true);
    const response = await createBulk(amount);
    setLoading(false);
    setShowAdd(false);
    Notify(response.ok && is2xxSuccessfull(response?.status), "create");
    fetchProducts();
  }

  // handle form input changes
  function handleInputChange(event: ChangeEvent<IFormElements>) {
    const { name, value } = event.target;
    if (name == "productPrice" || name == "count") {
      setProduct({ ...product, [name]: +value });
      return;
    }
    setProduct({ ...product, [name]: value });
  }

  // edit a product
  async function editProd() {
    setLoading(true);
    const response = await editProduct(product);
    setShowAdd(false);
    setShowEdit(false);
    setProduct(initialProduct);
    Notify(response.ok && is2xxSuccessfull(response?.status), "edit");
    fetchProducts();
  }

  // add a new product
  async function addProducts() {
    setLoading(true);
    const response = await createProducts(product);
    setProduct(initialProduct);
    setLoading(false);
    setShowAdd(false);
    Notify(response.ok && is2xxSuccessfull(response?.status), "add");
    fetchProducts();
  }

  const ReactTable = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    fetchProducts();
    ReactTable.setPageSize(5);
  }, []);

  return (
    <main className="flex h-screen flex-col items-center bg-gray-200 justify-center max-h-screen">
      <section className="flex space-y-6 flex-col p-6 ` w-3/5 border-2 bg-[#f2f7fa]">
        <button
          onClick={() => setShowAdd(true)}
          className="bg-[#e1e9fa] px-6 py-2 rounded-md flex justify-center items-center w-fit self-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="#325dfd"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          <h2 className="text-[#325dfd] font-semibold">
            Add item to inventory
          </h2>
        </button>
        {loading && (
          <section className="my-6 self-center">
            <div className="text-black flex font-bold gap-x-4">
              Updating table Data
              <span>
                <div className="animate-spin self-center rounded-full h-6 w-6 border-y-2 border-black"></div>
              </span>
            </div>
          </section>
        )}
        <section className="flex flex-col  pb-6">
          <h2 className="pl-2 font-medium text-[#325dfd] mb-4">Product List</h2>
          <ProductTable ReactTable={ReactTable} />
        </section>
      </section>

      <Modal active={showAdd}>
        <CreateProduct
          addProducts={addProducts}
          disableMilestoneButton={false}
          handleChange={handleInputChange}
          onCancel={() => setShowAdd(false)}
          addBulkProducts={bulkCreate}
          loading={loading}
        />
      </Modal>
      <Modal active={showEdit}>
        <EditProduct
          editProduct={editProd}
          handleChange={handleInputChange}
          onCancel={() => setShowEdit(false)}
          product={product}
          loading={loading}
        />
      </Modal>
    </main>
  );
}
