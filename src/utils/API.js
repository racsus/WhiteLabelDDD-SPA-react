import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: "json",
  headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', 'Content-Type': 'application/json'}
});