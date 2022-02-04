import { memo } from 'react';
import { PrivateRoutes, PublicRoutes } from 'core/routes';

export type AppProps = {
  isAuthorizated: boolean;
};

const App = ({ isAuthorizated }: AppProps) => {
  return isAuthorizated ? <PrivateRoutes /> : <PublicRoutes />;
};

export const AppMemoized = memo(App);
