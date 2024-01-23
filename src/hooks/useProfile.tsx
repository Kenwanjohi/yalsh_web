import axios from "axios";
import { useQuery } from "react-query";

export function useProfile() {
  return useQuery("profile", async function getProfile() {
    const res = await axios.get("http://localhost:3001/account", {
      withCredentials: true,
    });
    return res.data;
  });
}
