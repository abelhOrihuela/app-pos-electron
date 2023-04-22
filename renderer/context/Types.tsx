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

  setNotification: (message: string, severity: string) => void;
  message: string;
  severity: string;
  //close session handler

  closeSession: () => void;
};

export interface ResponseLogin {
  access_token: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  barcode: string;
  description: string;
}

export interface ICategory {
  name: string;
  description: string;
}

export interface IOrder {
  id: number;
}

export interface ResponsePaginated {
  items: [];
  page: number;
  size: number;
  max_page: number;
  total_pages: number;
  total: number;
  last: boolean;
  first: boolean;
  visible: number;
}

export interface SearchResponse {
  products: IProduct[];
}
