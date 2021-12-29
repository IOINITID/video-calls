import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Friends } from '../../../modules/friends/pages/friends';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/friends" element={<Friends />} />
      <Route path="/profile" />
      <Route path="*" element={<Navigate to="/friends" />} />
    </Routes>
  );
};

export const PrivateRoutesMemoized = memo(PrivateRoutes);
