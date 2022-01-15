import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Channels } from '../../../modules/channels/pages/channels';
import { Friends } from '../../../modules/friends/pages/friends';
import { Profile } from '../../../modules/profile/pages/profile';
import { FriendsInvites } from '../../components/friends-invites';
import { AllFriends } from '../../components/all-friends';
import { FriendsOnline } from '../../components/friends-online';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="friends" element={<Friends />}>
        <Route path="all-friends" element={<AllFriends />} />
        <Route path="friends-online" element={<FriendsOnline />} />
        <Route path="friends-invites" element={<FriendsInvites />} />
        {/* TODO: Доделать компоненты списка друзей */}
        <Route path="friends-approvals" element={<FriendsOnline />} />
        <Route path="add-to-friends" element={<FriendsOnline />} />
      </Route>
      <Route path="profile" element={<Profile />} />
      <Route path="channels" element={<Channels />} />
      <Route path="*" element={<Navigate to="friends/all-friends" />} />
    </Routes>
  );
};

export const PrivateRoutesMemoized = memo(PrivateRoutes);
