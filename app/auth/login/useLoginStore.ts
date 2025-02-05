import { create } from "zustand"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginState = z.infer<typeof loginSchema> & {
  isLoading: boolean
  showPassword: boolean
  errors: Partial<Record<keyof z.infer<typeof loginSchema>, string>>
  generalError: string
  setField: (field: keyof z.infer<typeof loginSchema>, value: string) => void
  toggleShowPassword: () => void
  setIsLoading: (isLoading: boolean) => void
  setGeneralError: (error: string) => void
  validateForm: () => boolean
  resetErrors: () => void
}

export const useLoginStore = create<LoginState>((set, get) => ({
  email: "",
  password: "",
  isLoading: false,
  showPassword: false,
  errors: {},
  generalError: "",
  setField: (field, value) =>
    set((state) => {
      const newState = { ...state, [field]: value }
      const result = loginSchema.safeParse(newState)
      if (result.success) {
        return { ...newState, errors: {} }
      } else {
        const fieldErrors = result.error.flatten().fieldErrors
        return { ...newState, errors: fieldErrors as LoginState["errors"] }
      }
    }),
  toggleShowPassword: () => set((state) => ({ showPassword: !state.showPassword })),
  setIsLoading: (isLoading) => set({ isLoading }),
  setGeneralError: (error) => set({ generalError: error }),
  validateForm: () => {
    const result = loginSchema.safeParse(get())
    if (result.success) {
      set({ errors: {} })
      return true
    } else {
      const fieldErrors = result.error.flatten().fieldErrors
      set({ errors: fieldErrors as LoginState["errors"] })
      return false
    }
  },
  resetErrors: () => set({ errors: {}, generalError: "" }),
}))

