import { IUser } from "@/store/userStore";
import { useEffect, useState } from "react";

const useGetUser = () => {
  const [user, setUser] = useState<IUser | null>(null);

  const localStorageUser = localStorage.getItem("user");

  useEffect(() => {
    if (localStorageUser) setUser(JSON.parse(localStorageUser));
  }, [localStorageUser]);

  return user;
};

export default useGetUser;
