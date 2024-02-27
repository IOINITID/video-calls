import { useEffect, useRef, useState } from 'react';
import { css } from '@linaria/core';
import { Button } from 'core/components/button';
import { mediaStream } from 'core/utils/media-stream-controller';
import { mediaDevices } from 'core/utils/media-devices-controller';
import { Select } from 'core/components/select';

export const MediaSettings = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioInputDevices, setAudioInputDevices] = useState<MediaDeviceInfo[] | null>(null);
  const [audioOutputDevices, setAudioOutputDevices] = useState<MediaDeviceInfo[] | null>(null);
  const [videoInputDevices, setVideoInputDevices] = useState<MediaDeviceInfo[] | null>(null);
  const [data, setData] = useState<number[]>([]);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    mediaDevices.getDevices('audioinput', (params) => {
      console.log(params);

      if (params.state === 'success') {
        setAudioInputDevices(params.devices);
      }
    });

    mediaDevices.getDevices('audiooutput', (params) => {
      console.log(params);

      if (params.state === 'success') {
        setAudioOutputDevices(params.devices);
      }
    });

    mediaDevices.getDevices('videoinput', (params) => {
      console.log(params);

      if (params.state === 'success') {
        setVideoInputDevices(params.devices);
      }
    });
  }, []);

  /**
   * Функция для обработки списка устройств.
   *
   * @param devices скисок устройств.
   * @returns обработанные данные.
   */
  const transformDevices = (devices: MediaDeviceInfo[] | null) => {
    if (devices === null || devices?.length === 0) {
      return [];
    }

    return devices?.map((value, index) => {
      return {
        id: index,
        label: value.label,
        value: value.label,
      };
    });
  };

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
              setStream(params.stream);

              mediaStream.audioStreamController.getVisualizer((data) => {
                setData(data);
              });
            })
          }
        >
          Включить видео и аудио поток
        </Button>
        <Button
          onClick={() =>
            mediaStream.closeStream((params) => {
              setStream(params.stream);
              setData([]);
            })
          }
        >
          Выключить видео и аудио поток
        </Button>
        <Button
          onClick={() =>
            mediaStream.audioStreamController.getStream((params) => {
              setStream(params.stream);

              mediaStream.audioStreamController.getVisualizer((data) => {
                setData(data);
              });
            })
          }
        >
          Включить аудио поток
        </Button>
        <Button
          onClick={() =>
            mediaStream.audioStreamController.closeStream((params) => {
              setStream(params.stream);
              setData([]);
            })
          }
        >
          Вылючить аудио поток
        </Button>
        <Button
          onClick={() =>
            mediaStream.videoStreamController.getStream((params) => {
              setStream(params.stream);
            })
          }
        >
          Включить видео поток
        </Button>
        <Button
          onClick={() =>
            mediaStream.videoStreamController.closeStream((params) => {
              setStream(params.stream);
            })
          }
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
            <Select
              options={transformDevices(audioInputDevices)}
              values={transformDevices(audioInputDevices).slice(0, 1)}
              onChange={(value) => {
                console.log(value);
              }}
            />
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
            <Select
              options={transformDevices(audioOutputDevices)}
              values={transformDevices(audioOutputDevices).slice(0, 1)}
              onChange={(value) => {
                console.log(value);
              }}
            />
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
            <Select
              options={transformDevices(videoInputDevices)}
              values={transformDevices(videoInputDevices).slice(0, 1)}
              onChange={(value) => {
                console.log(value);
              }}
            />
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
            muted
          />
        </div>
      </div>
    </div>
  );
};
