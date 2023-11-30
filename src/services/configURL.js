import axios from "axios";

const BASE_URL = 'https://jiranew.cybersoft.edu.vn';

const TokenCybersoft = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0OSIsIkhldEhhblN0cmluZyI6IjI3LzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxMTQ5NzYwMDAwMCIsIm5iZiI6MTY4MjYxNDgwMCwiZXhwIjoxNzExNjQ1MjAwfQ.4mCm0hbeazS7xy_3vtlKRk0Embky8sHJG22LuQj7FLc';

const configHeaderAxios = () => {
  // let token = sessionService.getItem('token');
  return {
    TokenCybersoft,
    // Authorization: `Bearer ${token}`,
  };
};


export const https = axios.create({
  baseURL: BASE_URL,
  headers: configHeaderAxios(),
});