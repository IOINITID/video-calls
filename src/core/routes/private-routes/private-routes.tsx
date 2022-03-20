import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Friends } from 'modules/friends/pages/friends';
import { Messages } from 'core/components/messages';
import { Profile } from 'modules/profile/pages/profile';
import { Channels } from 'modules/channels/pages/channels';
import { AllFriends } from 'core/components/all-friends';
import { FriendsOnline } from 'core/components/friends-online';
import { FriendsInvites } from 'core/components/friends-invites';
import { FriendsApprovals } from 'core/components/friends-approvals';
import { AddToFriends } from 'core/components/add-to-friends';
import { UserProfile } from 'modules/profile/pages/profile/components/user-profile';
import { UserAccount } from 'modules/profile/pages/profile/components/user-account';

const PrivateRoutes = () => {
  return (
    <Routes>
      {/* NOTE: Друзья */}
      <Route path="friends" element={<Friends />}>
        <Route path="all-friends" element={<AllFriends />} />
        <Route path="friends-online" element={<FriendsOnline />} />
        <Route path="friends-invites" element={<FriendsInvites />} />
        <Route path="friends-approvals" element={<FriendsApprovals />} />
        <Route path="add-to-friends" element={<AddToFriends />} />
      </Route>
      {/* NOTE: Сообщения */}
      <Route path="messages" element={<Messages />} />
      {/* NOTE: Настройка профиля */}
      <Route path="profile" element={<Profile />}>
        <Route path="user-account" element={<UserAccount />} />
        <Route path="user-profile" element={<UserProfile />} />
      </Route>
      {/* NOTE: Каналы */}
      <Route path="channels" element={<Channels />} />
      <Route path="*" element={<Navigate to="friends/all-friends" />} />
    </Routes>
  );
};

export const PrivateRoutesMemoized = memo(PrivateRoutes);
