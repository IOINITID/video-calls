import { memo } from 'react';
import { ChannelsLayout } from '../../../../core/layouts/channels-layout';

const Channels = () => {
  return <ChannelsLayout />;
};

export const ChannelsMemoized = memo(Channels);
