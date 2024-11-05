import { AuthenticationStatus } from "@rainbow-me/rainbowkit";
import { create } from "zustand";

export interface IUser {
  _id: string;
  walletAddress: `0x${string}`;
  trustScore: number;
  description:string;
  name:string;
}

type Store = {
  user: IUser | null;
  searchTerm: string;
  selectedCategory: string | null; // Add selectedCategory to store
  setUser(user: IUser | null): void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string | null) => void; // Setter for selectedCategory
  authStatus: AuthenticationStatus;
  setAuthStatus: (status: AuthenticationStatus) => void;
};

const localStorageUser =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;

const useUserStore = create<Store>((set) => ({
  user: localStorageUser ? JSON.parse(localStorageUser) : null,
  searchTerm: "",
  selectedCategory: null, // Initialize selectedCategory
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }), // Update selectedCategory
  authStatus: "loading",
  setAuthStatus(status) {
    return set({ authStatus: status });
  },
}));

export default useUserStore;
