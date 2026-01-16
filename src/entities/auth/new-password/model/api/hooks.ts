import { useMutation } from "@tanstack/react-query";
import { resetUserPassword } from "./endpoints";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetUserPassword,
  });
};
