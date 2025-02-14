import { create } from "zustand";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordState = z.infer<typeof resetPasswordSchema> & {
  isLoading: boolean;
  errors: Partial<Record<keyof z.infer<typeof resetPasswordSchema>, string>>;
  generalError: string;
  showPassword: boolean;
  setField: (
    field: keyof z.infer<typeof resetPasswordSchema>,
    value: string
  ) => void;
  setIsLoading: (isLoading: boolean) => void;
  setGeneralError: (error: string) => void;
  validateForm: () => boolean;
  resetErrors: () => void;
  toggleShowPassword: () => void;
};

export const useResetPasswordStore = create<ResetPasswordState>((set, get) => ({
  newPassword: "",
  confirmPassword: "",
  isLoading: false,
  errors: {},
  generalError: "",
  showPassword: false,
  setField: (field, value) =>
    set((state) => {
      const newState = { ...state, [field]: value };
      const result = resetPasswordSchema.safeParse(newState);
      if (result.success) {
        return { ...newState, errors: {} };
      } else {
        const fieldErrors = result.error.flatten().fieldErrors;
        return {
          ...newState,
          errors: fieldErrors as ResetPasswordState["errors"],
        };
      }
    }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setGeneralError: (error) => set({ generalError: error }),
  validateForm: () => {
    const result = resetPasswordSchema.safeParse(get());
    if (result.success) {
      set({ errors: {} });
      return true;
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;
      set({ errors: fieldErrors as ResetPasswordState["errors"] });
      return false;
    }
  },
  resetErrors: () => set({ errors: {}, generalError: "" }),
  toggleShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),
}));
