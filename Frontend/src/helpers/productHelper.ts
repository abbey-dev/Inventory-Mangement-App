import { Product } from "@/Interfaces/product";
import Toast from "@/components/Toast";

export async function Notify(flag: boolean, msg: string) {
  if (flag) {
    Toast({
      message: `Product ${msg}ed successfully`,
      type: "success",
    });
  } else {
    Toast({
      message: `Could not ${msg} product`,
      type: "failure",
    });
  }
}

export const initialProduct: Product = {
  productName: "",
  count: 0,
  createdAt: new Date(),
  productPrice: 0,
  description: "",
  id: "",
};
