export interface IUser {
  username: string;
}
export type AppContextType = {
  user: IUser;
  setUserData: (user: IUser) => void;
};
