import axios from "axios" 
export const http = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
  timeout: 30000,
  headers: {
    tokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgQWR2IDAzIiwiSGV0SGFuU3RyaW5nIjoiMjAvMDgvMjAyNSIsIkhldEhhblRpbWUiOiIxNzU1NjQ4MDAwMDAwIiwibmJmIjoxNzM1NTc4MDAwLCJleHAiOjE3NTU3OTU2MDB9.zhd-TJO0gE9p4RukPjsPXrnUxCFpIwyJx4Yw3fVyVas",
  },
});
