import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Channels } from '../../../modules/channels/pages/channels';
import { Friends } from '../../../modules/friends/pages/friends';
import { Profile } from '../../../modules/profile/pages/profile';
import { FriendsInvites } from '../../components/friends-invites';
import { AllFriends } from '../../components/all-friends';
import { FriendsOnline } from '../../components/friends-online';
import { FriendsApprovals } from '../../components/friends-approvals';
import { AddToFriends } from '../../components/add-to-friends';
import { Messages } from '../../components/messages';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="friends" element={<Friends />}>
        <Route path="all-friends" element={<AllFriends />} />
        <Route path="friends-online" element={<FriendsOnline />} />
        <Route path="friends-invites" element={<FriendsInvites />} />
        <Route path="friends-approvals" element={<FriendsApprovals />} />
        <Route path="add-to-friends" element={<AddToFriends />} />
      </Route>
      <Route path="messages" element={<Messages />} />
      <Route path="profile" element={<Profile />} />
      <Route path="channels" element={<Channels />} />
      <Route path="*" element={<Navigate to="friends/all-friends" />} />
    </Routes>
  );
};

export const PrivateRoutesMemoized = memo(PrivateRoutes);
