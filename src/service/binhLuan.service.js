import { http } from "./config";

export const binhLuanService = {
  layBinhLuanTheoPhong: (data) => {
    return http.get(`/binh-luan/lay-binh-luan-theo-phong/${data}`);
  },
};
