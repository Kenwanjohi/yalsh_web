import axiosInstance from "@/lib/axios";

import { useQuery } from "react-query";

export function useProfile() {
  return useQuery("profile", async function getProfile() {
    const res = await axiosInstance.get("/account", {
      withCredentials: true,
    });
    return res.data;
  });
}
