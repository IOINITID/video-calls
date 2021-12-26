export type AuthorizationResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
};

export type RegistrationResponse = AuthorizationResponse;
