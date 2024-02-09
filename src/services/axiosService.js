import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
});

export default axiosInstance;
