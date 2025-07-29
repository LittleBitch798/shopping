import { create } from 'zustand';

interface UserStore {
  phone: string;
  setPhone: (phone: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  phone: '',
  setPhone: (phone) => set({ phone }),
}));