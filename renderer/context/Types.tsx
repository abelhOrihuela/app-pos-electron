export interface IUser {
  username: string;
}
export type AppContextType = {
  isLoading: boolean;
  user: IUser;
  setUserData: (user: IUser) => void;
  setLoading: (loading: boolean) => void;
};
