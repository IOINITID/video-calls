import { css } from '@linaria/core';
import { Button } from 'core/components/button';
import { mediaStream } from 'core/utils/media-stream-instance';

import { StreamState } from 'core/utils/stream-controller';
import { useEffect, useRef, useState } from 'react';

export const MediaSettings = () => {
  const [mediaStreamState, setMediaStreamState] = useState<StreamState>('default');

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    console.log('LOGS:', { mediaStreamState });

    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream.stream;
    }
  }, [mediaStreamState]);

  return (
    <div
      className={css`
        display: grid;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      `}
    >
      <div
        className={css`
          display: grid;
          width: 400px;
          height: 225px;
        `}
      >
        <Button
          onClick={async () => {
            if (mediaStreamState === 'active') {
              mediaStream.closeStream((state) => {
                setMediaStreamState(state);
              });
            } else {
              await mediaStream.getStream((state) => {
                setMediaStreamState(state);
              });
            }
          }}
          disabled={mediaStreamState === 'loading'}
        >
          {mediaStreamState === 'active' ? 'Выключить видео' : 'Включить видео'}
        </Button>
        <video
          className={css`
            width: 100%;
            background-color: #ffffff;
          `}
          ref={videoRef}
          autoPlay
          muted
        />
      </div>
    </div>
  );
};
