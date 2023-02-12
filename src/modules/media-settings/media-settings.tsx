import { useEffect, useRef, useState } from 'react';
import { css } from '@linaria/core';
import { Button } from 'core/components/button';
import { mediaStream } from 'core/utils/media-stream-instance';
import { StreamState } from 'core/utils/stream-controller';

export const MediaSettings = () => {
  const [mediaStreamState, setMediaStreamState] = useState<StreamState>('default');

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
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
          grid-template-columns: repeat(2, 1fr);
          width: 500px;
          height: 225px;
        `}
      >
        <Button
          onClick={() =>
            mediaStream.getStream((state) => {
              console.log({ state });
              setMediaStreamState(state);
            })
          }
        >
          Включить видео и аудио поток
        </Button>
        <Button
          onClick={() =>
            mediaStream.closeStream((state) => {
              console.log({ state });
              setMediaStreamState(state);
            })
          }
        >
          Выключить видео и аудио поток
        </Button>
        <Button
          onClick={() =>
            mediaStream.audioStreamController.getStream((state) => {
              console.log({ state });
              setMediaStreamState(state);
            })
          }
        >
          Включить аудио поток
        </Button>
        <Button
          onClick={() =>
            mediaStream.audioStreamController.closeStream((state) => {
              console.log({ state });
              setMediaStreamState(state);
            })
          }
        >
          Вылючить аудио поток
        </Button>
        <Button
          onClick={() =>
            mediaStream.videoStreamController.getStream((state) => {
              console.log({ state });
              setMediaStreamState(state);
            })
          }
        >
          Включить видео поток
        </Button>
        <Button
          onClick={() =>
            mediaStream.videoStreamController.closeStream((state) => {
              console.log({ state });
              setMediaStreamState(state);
            })
          }
        >
          Вылючить видео поток
        </Button>
        <video
          className={css`
            grid-column: 1/-1;
            width: 100%;
            height: 225px;
            background-color: #ffffff;
            object-fit: contain;
          `}
          ref={videoRef}
          autoPlay
          muted
        />
      </div>
    </div>
  );
};
