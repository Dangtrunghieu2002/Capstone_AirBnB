// src/service/api.js
import axios from 'axios';

// Set the base URL for all axios requests
const api = axios.create({
  baseURL: 'https://airbnbnew.cybersoft.edu.vn/api', 
  headers: {
    tokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMiIsIkhldEhhblN0cmluZyI6IjIyLzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczNzUwNDAwMDAwMCIsIm5iZiI6MTcxMjk0MTIwMCwiZXhwIjoxNzM3NjUxNjAwfQ.QIS-5ejbLk-ly0KkZrtV0hoyQXSL9wqIkbziyg_m8hg', // Actual token
    'Content-Type': 'application/json',
  },
});

export default api;
