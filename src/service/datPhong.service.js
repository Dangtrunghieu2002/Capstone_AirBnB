import { http } from "./config";

export const datPhongService = {
  datPhong: (data) => {
    return http.post("/dat-phong", data);
  },
  layPhongTheoNguoiDung: (data) => {
    return http.get(`/dat-phong/lay-theo-nguoi-dung/${data}`);
  },
  xoaPhongDaDat: (data) => {
    return http.delete(`dat-phong/${data}`);
  },
};
