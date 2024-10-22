import { create } from "zustand";

export interface IUser {
  _id: string;
  walletAddress: `0x${string}`;
  trustScore: number;
}

type Store = {
  user: IUser | null;
  setUser(user: IUser | null): void;
};

const localStorageUser = window && localStorage.getItem("user");

export const useUserStore = create<Store>()((set) => ({
  user: localStorageUser ? JSON.parse(localStorageUser) : null,
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user: user });
  },
}));
