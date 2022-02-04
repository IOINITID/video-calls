import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Authorization } from '../../../modules/authorization/pages/authorization';
import { Registration } from '../../../modules/registration/pages/registration';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/authorization" element={<Authorization />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Navigate to="/authorization" />} />
    </Routes>
  );
};

export const PublicRoutesMemoized = memo(PublicRoutes);
