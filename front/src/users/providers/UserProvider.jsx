import { node } from "prop-types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getToken, getUser } from "../services/localStorageService";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(getToken());
  console.log(user);

  console.log(token, "token at userProvider");
  useEffect(() => {
    if (!user) {
      console.log("USER IS NULL!!!!!!!");
      const userFromLocalStorage = getUser();
      console.log(userFromLocalStorage);
      setUser(userFromLocalStorage);
    }
  }, [user, setUser]);

  const value = useMemo(
    () => ({ user, setUser, token, setToken }),
    [user, token],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  console.log(context);
  if (!context) throw new Error("useUser must be used within a NameProvider");
  return context;
};

UserProvider.propTypes = {
  children: node.isRequired,
};
