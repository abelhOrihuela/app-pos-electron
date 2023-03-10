import React, { useEffect } from "react";
import { AppContextType, IUser } from "./Types";

export const AppContext = React.createContext<AppContextType | null>(null);

const AppProvider = ({ children }) => {
  // global state
  const [currentUser, setCurrentUser] = React.useState<IUser>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [token, setToken] = React.useState("");
  const [error, setError] = React.useState("");

  // handlers context
  const setUserData = (user: IUser) => {
    setDataLocalStorage("user", user, true);
    setDataLocalStorage("isAuthenticated", true, true);
    setCurrentUser(user);
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const setAccessToken = (token: string) => {
    setDataLocalStorage("access_token", token, false);

    setToken(token);
  };

  const closeSession = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("isAuthenticated");
    window.localStorage.removeItem("access_token");
    setToken("");
    setCurrentUser(null);
  };

  const setGeneralError = (error: string) => {
    setError(error);
  };

  // validate session
  useEffect(() => {
    const sessionExists = getDataLocalStorage("isAuthenticated");
    const user = getDataLocalStorage("user");

    if (sessionExists) {
      setCurrentUser(user);
      setIsLoading(false);
    }
  }, []);

  const setDataLocalStorage = (key: string, value: any, stringify: boolean) => {
    window.localStorage.setItem(key, stringify ? JSON.stringify(value) : value);
  };

  const getDataLocalStorage = (key: string) => {
    const data = window.localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  };

  return (
    <AppContext.Provider
      value={{
        user: currentUser,
        setUserData,
        isLoading,
        setLoading,
        token,
        setAccessToken,
        closeSession,
        error,
        setGeneralError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: React.Component,
};

export default AppProvider;
