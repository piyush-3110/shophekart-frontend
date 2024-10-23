import { create } from "zustand";

export interface IUser {
  _id: string;
  walletAddress: `0x${string}`;
  trustScore: number;
}

type Store = {
  user: IUser | null;
  searchTerm: string;  // Add searchTerm to store
  setUser(user: IUser | null): void;
  setSearchTerm: (term: string) => void;  // Setter for searchTerm
};

const localStorageUser =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;

export const useUserStore = create<Store>((set) => ({
  user: localStorageUser ? JSON.parse(localStorageUser) : null,
  searchTerm: "",  // Initialize searchTerm
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  setSearchTerm: (term) => set({ searchTerm: term }),  // Update search term
}));
