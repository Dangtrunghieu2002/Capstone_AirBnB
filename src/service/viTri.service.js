import { http } from "./config"

export const viTriService = {
    layViTri : () => {
        return http.get("/vi-tri")
    },
}