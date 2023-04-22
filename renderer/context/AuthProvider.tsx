import Router from "next/router";
import React, { useEffect } from "react";
import { AppContextType, IUser } from "./Types";
import { AxiosResponse } from "axios";
import { CurrentUserResponse } from "../domain/Responses";
import api from "../lib/api";

export const AppContext = React.createContext<AppContextType | null>(null);

const AppProvider = ({ children }) => {
  // global state
  const [currentUser, setCurrentUser] = React.useState<IUser>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [token, setToken] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success");

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
    Router.replace("/Home");
  };

  const setNotification = (message: string, severity: string) => {
    setSeverity(severity);
    setTimeout(() => {
      setMessage(message);
    }, 10);
  };

  // validate session
  useEffect(() => {
    const sessionExists = getDataLocalStorage("isAuthenticated");

    if (sessionExists) {
      getCurrentUser();
    }
  }, []);

  const getCurrentUser = async () => {
    try {
      const { data }: AxiosResponse<CurrentUserResponse> = await api.get(
        "/pos/me"
      );
      setUserData(data as IUser);
    } catch (error) {
      window.localStorage.clear();
      setNotification(error.message, "error");
    }
    setIsLoading(false);
  };

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
        message,
        setNotification,
        severity,
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
