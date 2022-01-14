import { memo } from 'react';
import { FriendsLayout } from '../../../../core/layouts/friends-layout';

const Friends = () => {
  return <FriendsLayout />;
};

export const FriendsMemoized = memo(Friends);
