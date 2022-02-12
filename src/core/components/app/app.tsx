import { memo } from 'react';
import { PrivateRoutes, PublicRoutes } from 'core/routes';

type AppProps = {
  isAuthorizated: boolean;
};

const App = ({ isAuthorizated }: AppProps) => {
  return isAuthorizated ? <PrivateRoutes /> : <PublicRoutes />;
};

export const AppMemoized = memo(App);
