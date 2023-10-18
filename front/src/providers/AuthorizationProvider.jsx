import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getUser } from "../users/services/localStorageService";

const AuthorizationContext = createContext();

export default function AuthorizationProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const [admin, setAdmin] = useState(false);
  const user = getUser();

  const handleUserDisplay = useCallback(() => {
    user ? setLoggedIn(true) : setLoggedIn(false);

    if (user && user.isAdmin) setAdmin(true);
  }, [user]);

  const handleLogout = useEffect(() => {
    setLoggedIn(false);
  }, []);

  const contextValue = useMemo(() => {
    return {
      handleUserDisplay,
      user,
      loggedIn,
      admin,
    };
  }, [loggedIn, handleUserDisplay, handleLogout]);

  return (
    <AuthorizationContext.Provider value={contextValue}>
      {children}
    </AuthorizationContext.Provider>
  );
}

export const useAuthorization = () => {
  const context = useContext(AuthorizationContext);
  if (!context)
    throw Error("useAuthorization must be used within a NameProvider");
  return context;
};
