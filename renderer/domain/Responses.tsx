export interface ResponseLogin {
  access_token: string;
}

export interface IProductResponse {
  id: number;
  name: string;
  price: number;
  barcode: string;
  description: string;
}

export interface IUserResponse {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface IOrder {
  id: number;
}

export interface IResponsePaginated {
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

export interface IResponseProductsPaginated {
  items: IProductResponse[];
  page: number;
  size: number;
  max_page: number;
  total_pages: number;
  total: number;
  last: boolean;
  first: boolean;
  visible: number;
}

export interface IResponseUsersPaginated {
  items: IUserResponse[];
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
  products: IProductResponse[];
}

export interface CurrentUserResponse {
  username: string;
  email: string;
  role: string;
}
