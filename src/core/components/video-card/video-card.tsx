import { forwardRef, memo, Ref } from 'react';
import { Box, BoxProps } from '@mui/material';

type VideoCardProps = {
  autoPlay?: boolean;
  muted?: boolean;
  state?: 'ready' | 'calling' | 'connecting' | 'connected';
} & BoxProps;

// eslint-disable-next-line react/display-name
const VideoCard = forwardRef(({ children, ...props }: VideoCardProps, ref: Ref<HTMLVideoElement | null>) => {
  return (
    <Box>
      <Box component="video" ref={ref} {...props}>
        {children}
      </Box>
    </Box>
  );
});

export const VideoCardMemoized = memo(VideoCard);
