import { http } from "./config";

export const binhLuanService = {
  layBinhLuanTheoPhong: (data) => {
    return http.get(`/binh-luan/lay-binh-luan-theo-phong/${data}`);
  },
  binhLuan: (data, token) => {
    return http.post("/binh-luan", data, {
      headers: {
        token: token,
      },
    });
  },
};