import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';
import { Button } from 'core/components/button';
import { MediaService } from 'core/services';
import { SocketService } from 'core/services/socket';

export const MediaSettings = () => {
  const socket = new SocketService();
  const media = new MediaService();

  const [data, setData] = useState<number[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    socket.ping((ping) => {
      console.log(`Ping is ${ping}ms`);
    });

    socket.instance.on('connect', () => {
      console.log('Connect');
    });

    socket.instance.on('disconnect', () => {
      console.log('Disconnect');
    });

    window.addEventListener('stream', (event) => {
      console.log(event.detail.params);

      if (event.detail.params.type === 'audio') {
        if (audioRef.current) {
          audioRef.current.srcObject = event.detail.params.stream;
        }
      }

      if (event.detail.params.type === 'video') {
        if (videoRef.current) {
          videoRef.current.srcObject = event.detail.params.stream;
        }
      }
    });
  }, []);

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
          onClick={() => {
            media.stream.audio.get();
            media.stream.video.get();
          }}
        >
          Включить видео и аудио поток
        </Button>
        <Button
          onClick={() => {
            media.stream.audio.close();
            media.stream.video.close();
          }}
        >
          Выключить видео и аудио поток
        </Button>
        <Button
          onClick={() => {
            media.stream.audio.get();
          }}
        >
          Включить аудио поток
        </Button>
        <Button
          onClick={() => {
            media.stream.audio.close();
          }}
        >
          Вылючить аудио поток
        </Button>
        <Button
          onClick={() => {
            media.stream.video.get();
          }}
        >
          Включить видео поток
        </Button>
        <Button
          onClick={() => {
            media.stream.video.close();
          }}
        >
          Вылючить видео поток
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
            <div
              className={css`
                padding-bottom: 8px;
              `}
            >
              Список аудиоустройств ввода:
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
            <div
              className={css`
                padding-bottom: 8px;
              `}
            >
              Список аудиоустройств вывода:
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
            <div
              className={css`
                padding-bottom: 8px;
              `}
            >
              Список видеоустройств ввода:
            </div>
          </div>
          <div
            className={css`
              display: grid;
              grid-auto-flow: row;
              margin: 8px 0;
              padding: 8px;
              overflow: hidden;
              border: 1px solid #000000;
              border-radius: 8px;
            `}
          >
            <div
              className={css`
                display: grid;
                grid-auto-flow: column;
                width: 100%;
                height: 50px;
                transform: rotateX(-180deg);
              `}
            >
              {data.map((value, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: '2px',
                      height: value + 'px',
                      maxHeight: '50px',
                      backgroundColor: value > 50 ? '#fb742d' : '#47464d',
                    }}
                  />
                );
              })}
            </div>
            <div
              className={css`
                display: grid;
                grid-auto-flow: column;
                width: 100%;
                height: 50px;
              `}
            >
              {data.map((value, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: '2px',
                      height: value + 'px',
                      maxHeight: '50px',
                      backgroundColor: value > 50 ? '#fb742d' : '#47464d',
                    }}
                  />
                );
              })}
            </div>
          </div>
          <video
            className={css`
              width: 100%;
              height: 225px;
              background-color: #ffffff;
              object-fit: contain;
              border: 1px solid #000000;
              border-radius: 8px;
            `}
            ref={videoRef}
            autoPlay
          />
          <audio ref={audioRef} autoPlay />
        </div>
      </div>
    </div>
  );
};
