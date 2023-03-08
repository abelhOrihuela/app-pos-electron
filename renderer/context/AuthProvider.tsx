import React, { useEffect } from "react";
import { AppContextType, IUser } from "./Types";

export const AppContext = React.createContext<AppContextType | null>(null);

const AppProvider = ({ children }) => {
  // global state
  const [currentUser, setCurrentUser] = React.useState<IUser>();
  const [isLoading, setIsLoading] = React.useState(true);

  // handlers context
  const setUserData = (user: IUser) => {
    setDataLocalStorage("user", user);
    setDataLocalStorage("isAuthenticated", true);
    setCurrentUser(user);
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  useEffect(() => {
    const sessionExists = getDataLocalStorage("isAuthenticated");
    const user = getDataLocalStorage("user");

    if (sessionExists) {
      setCurrentUser(user);
      setIsLoading(false);
    }
  }, []);

  const setDataLocalStorage = (key: string, value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value));
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
