import { useEffect, useRef, useState } from 'react';
import { css } from '@linaria/core';
import { Button } from 'core/components/button';
import { mediaStream } from 'core/utils/media-stream-instance';
import { StreamState } from 'core/utils/stream-controller';
import { mediaDevices } from 'core/utils/media-devices-controller';

export const MediaSettings = () => {
  const [streamState, setStreamState] = useState<StreamState>('default');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioInputDevices, setAudioInputDevices] = useState<MediaDeviceInfo[] | null>(null);
  const [audioOutputDevices, setAudioOutputDevices] = useState<MediaDeviceInfo[] | null>(null);
  const [videoInputDevices, setVideoInputDevices] = useState<MediaDeviceInfo[] | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    console.log({ streamState });
  }, [streamState]);

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
        `}
      >
        <Button
          onClick={() =>
            mediaStream.getStream((params) => {
              console.log({ params });
              setStreamState(params.state);
              setStream(params.stream);
            })
          }
        >
          Включить видео и аудио поток
        </Button>
        <Button
          onClick={() =>
            mediaStream.closeStream((params) => {
              console.log({ params });
              setStreamState(params.state);
              setStream(params.stream);
            })
          }
        >
          Выключить видео и аудио поток
        </Button>
        <Button
          onClick={() =>
            mediaStream.audioStreamController.getStream((params) => {
              console.log({ params });
              setStreamState(params.state);
              setStream(params.stream);
            })
          }
        >
          Включить аудио поток
        </Button>
        <Button
          onClick={() =>
            mediaStream.audioStreamController.closeStream((params) => {
              console.log({ params });
              setStreamState(params.state);
              setStream(params.stream);
            })
          }
        >
          Вылючить аудио поток
        </Button>
        <Button
          onClick={() =>
            mediaStream.videoStreamController.getStream((params) => {
              console.log({ params });
              setStreamState(params.state);
              setStream(params.stream);
            })
          }
        >
          Включить видео поток
        </Button>
        <Button
          onClick={() =>
            mediaStream.videoStreamController.closeStream((params) => {
              console.log({ params });
              setStreamState(params.state);
              setStream(params.stream);
            })
          }
        >
          Вылючить видео поток
        </Button>
        <Button
          className={css`
            grid-column: 1/-1;
          `}
          onClick={() =>
            mediaDevices.getAudioInputDevices((audioInputDevices) => {
              console.log('LOGS:', { audioInputDevices });
              setAudioInputDevices(audioInputDevices);
            })
          }
        >
          Получить список аудиоустройств ввода
        </Button>
        <Button
          className={css`
            grid-column: 1/-1;
          `}
          onClick={() =>
            mediaDevices.getAudioOutputDevices((audioOutputDevices) => {
              console.log('LOGS:', { audioOutputDevices });
              setAudioOutputDevices(audioOutputDevices);
            })
          }
        >
          Получить список аудиоустройств вывода
        </Button>
        <Button
          className={css`
            grid-column: 1/-1;
          `}
          onClick={() =>
            mediaDevices.getVideoInputDevices((videoInputDevices) => {
              console.log('LOGS:', { videoInputDevices });
              setVideoInputDevices(videoInputDevices);
            })
          }
        >
          Получить список видеоустройств вывода
        </Button>
        <div
          className={css`
            display: grid;
            grid-column: 1/-1;
            row-gap: 4px;
            padding: 8px;
            background-color: #ffffff;
          `}
        >
          <div
            className={css`
              padding: 8px;
              background-color: #ffffff;
              border: 1px solid #000000;
              border-radius: 8px;
            `}
          >
            Список аудиоустройств ввода:
            <div>
              {audioInputDevices?.map((value) => {
                return <div key={value.deviceId}>{value.label}</div>;
              })}
            </div>
          </div>
          <div
            className={css`
              padding: 8px;
              background-color: #ffffff;
              border: 1px solid #000000;
              border-radius: 8px;
            `}
          >
            Список аудиоустройств вывода:
            <div>
              {audioOutputDevices?.map((value) => {
                return <div key={value.deviceId}>{value.label}</div>;
              })}
            </div>
          </div>
          <div
            className={css`
              padding: 8px;
              background-color: #ffffff;
              border: 1px solid #000000;
              border-radius: 8px;
            `}
          >
            Список видеоустройств ввода:
            <div>
              {videoInputDevices?.map((value) => {
                return <div key={value.deviceId}>{value.label}</div>;
              })}
            </div>
          </div>
          <video
            className={css`
              width: 100%;
              height: 225px;
              background-color: #ffffff;
              object-fit: contain;
              border-radius: 8px;
            `}
            ref={videoRef}
            autoPlay
            muted
          />
        </div>
      </div>
    </div>
  );
};
