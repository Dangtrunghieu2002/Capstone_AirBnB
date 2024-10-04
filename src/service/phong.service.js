import { http } from "./config";
export const phongService = {
  layPhongTheoViTri: (data) => {
    return http.get(`phong-thue/lay-phong-theo-vi-tri?maViTri=${data}`);
  },
  layPhongTheoId: (data) => {
    return http.get(`/phong-thue/${data}`);
  },
};