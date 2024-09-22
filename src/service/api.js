// src/service/api.js
import axios from 'axios';

// Set the base URL for all axios requests
const api = axios.create({
  baseURL: 'https://airbnbnew.cybersoft.edu.vn/api', 
  headers: {
    tokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNDUiLCJIZXRIYW5TdHJpbmciOiIzMC8wNC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NDU5NzEyMDAwMDAiLCJuYmYiOjE3Mjc0NTY0MDAsImV4cCI6MTc0NjExODgwMH0.gdn0Ro-XoinRMbd5RHt_WkyYrxg2MTNuTvlkmV4BNt8', // Actual token
    'Content-Type': 'application/json',
  },
});

export default api;
