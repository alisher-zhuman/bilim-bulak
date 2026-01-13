import { toast } from "sonner";
import { useSignUpStore } from "@/entities/sign-up/model/store";
import { useRegister } from "@/entities/sign-up/model/api/queries";
import type { SignUpWorkFormValues } from "@/entities/sign-up/model/types";

export const useSignUpWorkSubmit = () => {
  const firstStep = useSignUpStore((s) => s.firstStep);
  const setSecondStep = useSignUpStore((s) => s.setSecondStep);

  const registerM = useRegister();

  const onSubmit = async (formValues: SignUpWorkFormValues) => {
    setSecondStep(formValues);

    if (!firstStep) return;

    const payload = {
      phone: firstStep.phone,
      password: firstStep.password,
      ...formValues,
    };

    // return registerM.mutateAsync(payload);

    
  };

  return { registerM, onSubmit };
};
