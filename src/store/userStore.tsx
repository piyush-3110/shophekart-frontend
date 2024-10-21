import { create } from "zustand";

export interface IUser {
  walletAddress: `0x${string}`;
  firstName?: string;
  lastName?: string;
  email?: string;
  _id: string;
  phoneNumber?: string;
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
