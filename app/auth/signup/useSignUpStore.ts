import { create } from "zustand"
import { z } from "zod"

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
})

type SignUpState = z.infer<typeof signUpSchema> & {
  showPassword: boolean
  isLoading: boolean
  errors: Partial<Record<keyof z.infer<typeof signUpSchema>, string>>
  setField: (field: keyof z.infer<typeof signUpSchema>, value: string) => void
  toggleShowPassword: () => void
  setIsLoading: (isLoading: boolean) => void
  validateForm: () => boolean
}

export const useSignUpStore = create<SignUpState>((set, get) => ({
  email: "",
  password: "",
  showPassword: false,
  isLoading: false,
  errors: {},
  setField: (field, value) =>
    set((state) => {
      const newState = { ...state, [field]: value }
      const result = signUpSchema.safeParse(newState)
      if (result.success) {
        return { ...newState, errors: {} }
      } else {
        const fieldErrors = result.error.flatten().fieldErrors
        return { ...newState, errors: fieldErrors as SignUpState["errors"] }
      }
    }),
  toggleShowPassword: () => set((state) => ({ showPassword: !state.showPassword })),
  setIsLoading: (isLoading) => set({ isLoading }),
  validateForm: () => {
    const result = signUpSchema.safeParse(get())
    if (result.success) {
      set({ errors: {} })
      return true
    } else {
      const fieldErrors = result.error.flatten().fieldErrors
      set({ errors: fieldErrors as SignUpState["errors"] })
      return false
    }
  },
}))

