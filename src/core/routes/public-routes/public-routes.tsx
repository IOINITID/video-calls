import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Authorization } from 'modules/authorization/pages/authorization';
import { Registration } from 'modules/authorization/pages/registration';
import { MediaSettings } from 'modules/media-settings';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="authorization" element={<Authorization />} />
      <Route path="registration" element={<Registration />} />
      <Route path="media-settings" element={<MediaSettings />} />
      <Route path="*" element={<Navigate to="authorization" />} />
    </Routes>
  );
};

export const PublicRoutesMemoized = memo(PublicRoutes);
