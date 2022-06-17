import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Friends } from 'modules/friends/pages/friends';
import { Settings } from 'modules/user/pages/settings';
import { Channels } from 'modules/channels/pages/channels';
import { FriendsAll } from 'modules/friends/pages/friends/components/friends-all';
import { FriendsOnline } from 'modules/friends/pages/friends/components/friends-online';
import { FriendsInvitations } from 'modules/friends/pages/friends/components/friends-invitations';
import { FriendsBlocked } from 'modules/friends/pages/friends/components/friends-blocked';
import { FriendsAdd } from 'modules/friends/pages/friends/components/friends-add';
import { UserProfile } from 'modules/user/pages/settings/components/user-profile';
import { UserAccount } from 'modules/user/pages/settings/components/user-account';
import { VoiceAndVideo } from 'modules/user/pages/settings/components/voice-and-video';
import { Meet } from 'modules/meet/pages/meet';

const PrivateRoutes = () => {
  return (
    <Routes>
      {/* NOTE: Друзья */}
      <Route path="friends" element={<Friends />}>
        {/* NOTE: Редирект на В сети */}
        <Route index element={<Navigate to="online" />} />
        {/* NOTE: В сети */}
        <Route path="online" element={<FriendsOnline />} />
        {/* NOTE: Все  */}
        <Route path="all" element={<FriendsAll />} />
        {/* NOTE: Ожидания */}
        <Route path="invitations" element={<FriendsInvitations />} />
        {/* NOTE: Заблокированные */}
        <Route path="blocked" element={<FriendsBlocked />} />
        {/* NOTE: Добавить в друзья */}
        <Route path="add" element={<FriendsAdd />} />
      </Route>
      {/* NOTE: Сообщения */}
      {/* <Route path="messages" element={<Messages />} /> */}
      {/* NOTE: Настройка */}
      <Route path="settings" element={<Settings />}>
        <Route path="user-account" element={<UserAccount />} />
        <Route path="user-profile" element={<UserProfile />} />
        <Route path="voice-and-video" element={<VoiceAndVideo />} />
      </Route>
      {/* NOTE: Каналы */}
      <Route path="channels" element={<Channels />} />
      {/* NOTE: Встреча */}
      <Route path="meet">
        <Route path=":id" element={<Meet />} />
      </Route>
      <Route path="*" element={<Navigate to="friends/online" />} />
    </Routes>
  );
};

export const PrivateRoutesMemoized = memo(PrivateRoutes);
