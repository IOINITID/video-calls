import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Channels } from '../../../modules/channels/pages/channels';
import { Friends } from '../../../modules/friends/pages/friends';
import { Profile } from '../../../modules/profile/pages/profile';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/friends" element={<Friends />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/channels" element={<Channels />} />
      <Route path="*" element={<Navigate to="/friends" />} />
    </Routes>
  );
};

export const PrivateRoutesMemoized = memo(PrivateRoutes);
