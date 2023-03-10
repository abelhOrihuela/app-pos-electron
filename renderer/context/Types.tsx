export interface IUser {
  username: string;
}
export type AppContextType = {
  //loading state
  setLoading: (loading: boolean) => void;
  isLoading: boolean;
  //user state

  setUserData: (user: IUser) => void;
  user: IUser;
  //access token state

  setAccessToken: (token: string) => void;
  token: string;
  //error state

  setGeneralError: (error: string) => void;
  error: string;
  //close session handler

  closeSession: () => void;
};

export interface ResponseLogin {
  access_token: string;
}
