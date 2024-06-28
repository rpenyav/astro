import axios from "axios";
import { API_URL } from "@env";

const publicApi = axios.create({
  baseURL: API_URL,
});

export default publicApi;
