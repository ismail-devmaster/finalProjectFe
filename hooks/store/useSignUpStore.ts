import { create } from "zustand";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  );

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "Invalid date format (YYYY-MM-DD)",
  ),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  sexId: z.enum(["male", "female"], { invalid_type_error: "Invalid sex" }),
  medicalHistory: z.string(),
});

type SignUpState = z.infer<typeof signUpSchema> & {
  showPassword: boolean;
  isLoading: boolean;
  errors: Partial<Record<keyof z.infer<typeof signUpSchema>, string>>;
  setField: (field: keyof z.infer<typeof signUpSchema>, value: string) => void;
  toggleShowPassword: () => void;
  setIsLoading: (isLoading: boolean) => void;
  validateForm: () => boolean;
};

export const useSignUpStore = create<SignUpState>((set, get) => ({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  phone: "",
  sexId: "male",
  medicalHistory: "",
  showPassword: false,
  isLoading: false,
  errors: {},
  setField: (field, value) =>
    set((state) => {
      const newState = { ...state, [field]: value };
      const result = signUpSchema.safeParse(newState);
      if (result.success) {
        return { ...newState, errors: {} };
      } else {
        const fieldErrors = result.error.flatten().fieldErrors;
        return { ...newState, errors: fieldErrors as SignUpState["errors"] };
      }
    }),
  toggleShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),
  setIsLoading: (isLoading) => set({ isLoading }),
  validateForm: () => {
    const result = signUpSchema.safeParse(get());
    if (result.success) {
      set({ errors: {} });
      return true;
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;
      set({ errors: fieldErrors as SignUpState["errors"] });
      return false;
    }
  },
}));
