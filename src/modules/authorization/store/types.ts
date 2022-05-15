export type AuthorizationState = {
  access_token: string;
  authorizated: boolean;
  loading: {
    access_token: boolean;
  };
  error: {
    access_token: any | null;
  };
};
