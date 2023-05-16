export interface ICreateUserForm {
  username: string;
  email: string;
  role: string;
  password: string;
}

export interface IUpdateUserForm {
  username: string;
  email: string;
  role: string;
}

export interface ICreateCategoryForm {
  name: string;
  description: string;
}
