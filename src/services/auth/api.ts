import axios from "axios";

export default axios.create({
  baseURL: process.env.PETINDER_AUTH_API
});
