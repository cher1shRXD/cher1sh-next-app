import { create } from 'zustand'

interface LoadingStore {
  isLoading : boolean;
  setIsLoading : (val : boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set)=>({
  isLoading : false,
  setIsLoading : (isLoading) => set({isLoading})
}))
