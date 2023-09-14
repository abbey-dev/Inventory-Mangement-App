import { Product } from "@/Interfaces/product";
import apiClient from "./client";
import { ApiResponse } from "apisauce";

export async function getProducts(): Promise<ApiResponse<{ data: Product[] }>> {
  return await apiClient.get("/products");
}

export async function getProduct(
  id: string
): Promise<ApiResponse<{ data: Product }>> {
  return await apiClient.get(`/products${id}`);
}

export async function countProducts(): Promise<ApiResponse<{ count: number }>> {
  return await apiClient.get("/products/count");
}

export async function createProducts(
  data: Product
): Promise<ApiResponse<{ data: Product }>> {
  return await apiClient.post("/products", data);
}

export async function createBulk(
  amount: number
): Promise<ApiResponse<{ data: { count: number; success: boolean } }>> {
  return await apiClient.post("/products/bulk", { amount });
}

export async function editProduct(
  product: Product
): Promise<ApiResponse<{ data: Product }>> {
  return await apiClient.patch(`/products/${product.id}`, product);
}
export async function deleteProduct(
  id: string
): Promise<ApiResponse<{ success: boolean; message: string }>> {
  return await apiClient.delete(`/products/${id}`);
}
