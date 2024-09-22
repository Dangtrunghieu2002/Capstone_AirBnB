import { http } from "./config"

export const viTriService = {
    layViTri : () => {
        return http.get("/vi-tri")
    },
    phanTrangTimKiem : (data) => {
        return http.get(`/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=10&keyword=${data}`)
    }
}