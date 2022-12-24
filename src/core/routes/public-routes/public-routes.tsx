import { lazy, memo, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Authorization } from 'modules/authorization/pages/authorization';
import { Registration } from 'modules/authorization/pages/registration';

const FastConnection = lazy(() => import('modules/fast-connection/pages/fast-connection'));

const PublicRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="authorization" element={<Authorization />} />
        <Route path="registration" element={<Registration />} />
        <Route path="fast-connection" element={<FastConnection />} />
        <Route path="*" element={<Navigate to="authorization" />} />
      </Routes>
    </Suspense>
  );
};

export const PublicRoutesMemoized = memo(PublicRoutes);
