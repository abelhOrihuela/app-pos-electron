import * as React from "react";
import { AppContextType, IUser } from "./Types";

export const AppContext = React.createContext<AppContextType | null>(null);

const AppProvider = ({ children }) => {
  // global state
  const [currentUser, setCurrentUser] = React.useState<IUser>();

  // handlers context
  const setUserData = (user: IUser) => {
    setCurrentUser(user);
  };

  return (
    <AppContext.Provider value={{ user: currentUser, setUserData }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: React.Component,
};

export default AppProvider;
