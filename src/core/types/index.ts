export type AuthorizationResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export type RegistrationResponse = AuthorizationResponse;
