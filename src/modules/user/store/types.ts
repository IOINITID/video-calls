export type UserState = {
  id: string;
  email: string;
  token: string;
  isAuthorizated: boolean;
  users: UserResponse[];
};

export type UserResponse = {
  _id: string;
  email: string;
  status: string;
};
