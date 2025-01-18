import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:5174/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export default Axios;

export const ShopAxios = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
