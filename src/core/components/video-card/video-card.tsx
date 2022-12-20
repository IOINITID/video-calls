/* eslint-disable jsx-a11y/media-has-caption */
import { DetailedHTMLProps, forwardRef, Ref, VideoHTMLAttributes } from 'react';

type VideoCardProps = {
  state?: 'ready' | 'calling' | 'connecting' | 'connected';
} & DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;

// eslint-disable-next-line react/display-name
const VideoCard = forwardRef(({ children, ...props }: VideoCardProps, ref: Ref<HTMLVideoElement>) => {
  return (
    <div>
      <video ref={ref} {...props}>
        {children}
      </video>
    </div>
  );
});

export { VideoCard };
