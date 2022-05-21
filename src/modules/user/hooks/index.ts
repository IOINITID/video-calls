import { useEffect, useRef, useState } from 'react';

/**
 * Hook that return timer values.
 */
export const useTimer = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevValue) => prevValue + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, '0');

  const seconds = Number(timer - Math.floor(timer / 60) * 60)
    .toString()
    .padStart(2, '0');

  return { minutes, seconds };
};

/**
 * Hook который возвращает медиа поток, его статус и возможные ошибки.
 */
export const useUserMedia = () => {
  const [state, setState] = useState<'pending' | 'fulfilled' | 'rejected' | undefined>();
  const [stream, setStream] = useState<MediaStream | undefined>();
  const [error, setError] = useState<unknown | undefined>();

  const getUserMedia = async (constraints?: MediaStreamConstraints | undefined) => {
    try {
      setState('pending');

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      setState('fulfilled');
      setStream(stream);
    } catch (error) {
      setState('rejected');
      setError(error);
    }
  };

  const stopUserMedia = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  useEffect(() => {
    return () => {
      stopUserMedia();
    };
  }, [stream]);

  return { state, stream, error, getUserMedia, stopUserMedia };
};

/**
 * Hook которые возвращает список медиаустройств по типам.
 */
export const useDeviceInfo = () => {
  const [state, setState] = useState<'pending' | 'fulfilled' | 'rejected' | undefined>();
  const [audioInDevices, setAudioInDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioOutDevices, setAudioOutDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoInDevices, setVideoInDevices] = useState<MediaDeviceInfo[]>([]);
  const [error, setError] = useState<unknown | undefined>();

  const getDeviceInfo = async () => {
    try {
      setState('pending');

      const devices = await navigator.mediaDevices.enumerateDevices();

      setState('fulfilled');

      const audioInDevices = devices.filter((device) => device.kind === 'audioinput');
      const audioOutDevices = devices.filter((device) => device.kind === 'audiooutput');
      const videoInDevices = devices.filter((device) => device.kind === 'videoinput');

      setAudioInDevices(audioInDevices);
      setAudioOutDevices(audioOutDevices);
      setVideoInDevices(videoInDevices);
    } catch (error) {
      setState('rejected');
      setError(error);
    }
  };

  return { state, audioInDevices, audioOutDevices, videoInDevices, error, getDeviceInfo };
};
