import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./endpoints";

export const useGetProfile = () => {
  return useQuery({ queryKey: ["regions"], queryFn: getProfile });
};
