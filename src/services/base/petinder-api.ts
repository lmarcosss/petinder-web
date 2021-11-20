import axios from 'axios';

export default axios.create({
  baseURL: process.env.PETINDER_API,
});
