import { create } from "zustand";

interface CompleteProfileState {
  dateOfBirth: string;
  phone: string;
  sexId: string;
  isLoading: boolean;
  errors: Partial<Record<string, string>>;
  setField: (field: string, value: string) => void;
  setIsLoading: (loading: boolean) => void;
  validateForm: () => boolean;
}

export const useCompleteProfileStore = create<CompleteProfileState>((set) => ({
  dateOfBirth: "",
  phone: "",
  sexId: "male",
  isLoading: false,
  errors: {},
  setField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
      errors: { ...state.errors, [field]: "" }, // Reset errors on change
    })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  validateForm: () => {
    // Basic validation logic
    return true;
  },
}));
