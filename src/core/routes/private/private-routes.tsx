import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/profile" />
    </Routes>
  );
};

export const PrivateRoutesMemoized = memo(PrivateRoutes);
