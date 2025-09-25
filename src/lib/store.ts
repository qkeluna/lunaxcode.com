import { create } from 'zustand';

interface OnboardingState {
  isModalOpen: boolean;
  selectedService: string;
  formData: Record<string, unknown>;
  currentStep: number;
  openModal: (service: string) => void;
  closeModal: () => void;
  setFormData: (data: Record<string, unknown>) => void;
  setCurrentStep: (step: number) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  isModalOpen: false,
  selectedService: '',
  formData: {},
  currentStep: 1,
  openModal: (service: string) => set({
    isModalOpen: true,
    selectedService: service,
    currentStep: 1,
    formData: {}
  }),
  closeModal: () => set({
    isModalOpen: false,
    selectedService: '',
    currentStep: 1,
    formData: {}
  }),
  setFormData: (data: Record<string, unknown>) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),
  setCurrentStep: (step: number) => set({ currentStep: step }),
  reset: () => set({
    isModalOpen: false,
    selectedService: '',
    formData: {},
    currentStep: 1
  }),
}));