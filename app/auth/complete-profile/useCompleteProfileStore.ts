import { create } from "zustand"
import { z } from "zod"

export const completeProfileSchema = z.object({
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  sexId: z.enum(["male", "female"], { invalid_type_error: "Invalid sex" }),
})

type CompleteProfileState = z.infer<typeof completeProfileSchema> & {
  isLoading: boolean
  errors: Partial<Record<keyof z.infer<typeof completeProfileSchema>, string>>
  setField: (field: keyof z.infer<typeof completeProfileSchema>, value: string) => void
  setIsLoading: (isLoading: boolean) => void
  validateForm: () => boolean
}

export const useCompleteProfileStore = create<CompleteProfileState>((set, get) => ({
  dateOfBirth: "",
  phone: "",
  sexId: "male",
  isLoading: false,
  errors: {},
  setField: (field, value) =>
    set((state) => {
      const newState = { ...state, [field]: value }
      const result = completeProfileSchema.safeParse(newState)
      if (result.success) {
        return { ...newState, errors: {} }
      } else {
        const fieldErrors = result.error.flatten().fieldErrors
        return { ...newState, errors: fieldErrors as CompleteProfileState["errors"] }
      }
    }),
  setIsLoading: (isLoading) => set({ isLoading }),
  validateForm: () => {
    const result = completeProfileSchema.safeParse(get())
    if (result.success) {
      set({ errors: {} })
      return true
    } else {
      const fieldErrors = result.error.flatten().fieldErrors
      set({ errors: fieldErrors as CompleteProfileState["errors"] })
      return false
    }
  },
}))

