import { toast as ReactToast, ToastOptions } from "react-toastify";

interface props {
  message: string;
  type: "success" | "failure" | "info";
}

export default function Index({ message, type }: props) {
  const toast = ReactToast;

  const options: ToastOptions = {
    position: "top-right",
    theme: "light",
    toastId: "toastId",
  };

  switch (type) {
    case "info":
      toast.info(message, options);
    case "failure":
      toast.error(message, options);
    case "success":
      toast.success(message, options);
  }
}
