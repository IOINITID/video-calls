export type AuthorizationState = {
  access_token: string;
  refresh_token: string;
  authorizated: boolean;
  loading: {
    access_token: boolean;
    refresh_token: boolean;
  };
  error: {
    access_token: any | null;
    refresh_token: any | null;
  };
};
