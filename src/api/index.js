import axios from "axios";

const service = axios.create({
  baseURL: "http://192.168.1.182:6868",
  headers: {
    "content-type": "application/json",
  },
});

export default service;
