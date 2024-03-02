import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';
import { Button } from 'core/components/button';
import { Media } from 'core/services';

export const MediaSettings = () => {
  const [data, setData] = useState<number[]>([]);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const media = new Media();

  useEffect(() => {
    // @ts-ignore
    window.addEventListener('stream', (event: CustomEvent) => {
      console.log(event.detail.params);

      if (videoRef.current) {
        videoRef.current.srcObject = event.detail.params.stream;
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
            media.stream.get();
          }}
        >
          Включить видео и аудио поток
        </Button>
        <Button
          onClick={() => {
            media.stream.close();
          }}
        >
          Выключить видео и аудио поток
        </Button>
        <Button onClick={() => {}}>Включить аудио поток</Button>
        <Button onClick={() => {}}>Вылючить аудио поток</Button>
        <Button onClick={() => {}}>Включить видео поток</Button>
        <Button onClick={() => {}}>Вылючить видео поток</Button>
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
            // muted
          />
        </div>
      </div>
    </div>
  );
};
