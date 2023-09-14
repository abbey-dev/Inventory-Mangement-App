import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://localhost:8080/api/v1/",
});

export default apiClient;
