import { User } from "@/entities/user/types/user";
import { create } from "zustand";

interface State {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<State>(set => ({
  user: null,
  setUser: (user) => set({ user })
}))