import { memo, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Authorization } from 'modules/authorization/pages/authorization';
import { Registration } from 'modules/registration/pages/registration';

const PublicRoutes = () => {
  return (
    <Suspense fallback="Загрузка...">
      <Routes>
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<Navigate to="/authorization" />} />
      </Routes>
      Б/
    </Suspense>
  );
};

export const PublicRoutesMemoized = memo(PublicRoutes);
