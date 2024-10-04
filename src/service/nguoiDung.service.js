import { http } from "./config";

export const nguoiDungService = {
  layNguoiDungTheoId: (data) => {
    return http.get(`/users/${data}`);
  },
  updateUser: (id, data) => {
    return http.put(`/users/${id}`, data);
  },
  uploadAvatar: (data, token) => {
    return http.post("/users/upload-avatar", data, {
      headers: {
        token,
      },
    });
  },
};
