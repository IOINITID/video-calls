import { lazy, memo, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Friends = lazy(() => import('modules/friends/pages/friends'));
const Messages = lazy(() => import('core/components/messages'));
const Profile = lazy(() => import('modules/profile/pages/profile'));
const Channels = lazy(() => import('modules/channels/pages/channels'));
const AllFriends = lazy(() => import('core/components/all-friends'));
const FriendsOnline = lazy(() => import('core/components/friends-online'));
const FriendsInvites = lazy(() => import('core/components/friends-invites'));
const FriendsApprovals = lazy(() => import('core/components/friends-approvals'));
const AddToFriends = lazy(() => import('core/components/add-to-friends'));

const PrivateRoutes = () => {
  return (
    <Suspense fallback="Загрузка...">
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
    </Suspense>
  );
};

export const PrivateRoutesMemoized = memo(PrivateRoutes);
