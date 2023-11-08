import axios from "axios";
import { sessionService } from "./sessionServices";

const BASE_URL = 'https://jiranew.cybersoft.edu.vn';

const TokenCybersoft = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzdHJpbmciLCJuYmYiOjE2MjcyOTAzODYsImV4cCI6MTYyNzI5Mzk4Nn0.75DGRowsyI7Sl6bmYgKuZ8oaG36fOr0TUWbUwAjtDs';

let token = sessionService.getItem('token');

const configHeaderAxios = () => {
  return {
    TokenCybersoft,
    Authorization: 'Bearer ' + token,
  };
};


export const https = axios.create({
  baseURL: BASE_URL,
  headers: configHeaderAxios(),
});