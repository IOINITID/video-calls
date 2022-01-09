import { memo } from 'react';
import { PrivateRoutes } from '../../routes/private';
import { PublicRoutes } from '../../routes/public';

const App = ({ isAuthorizated }: { isAuthorizated: boolean }) => {
  return <>{isAuthorizated ? <PrivateRoutes /> : <PublicRoutes />}</>;
};

export const AppMemoized = memo(App);
