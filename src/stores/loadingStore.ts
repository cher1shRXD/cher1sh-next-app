import { create } from 'zustand'

interface Loading {
  isLoading : boolean;
  setIsLoading : (val : boolean) => void;
}
export const loadingStore = create<Loading>((set)=>({
  isLoading : false,
  setIsLoading : (isLoading) => set({isLoading})
}))
