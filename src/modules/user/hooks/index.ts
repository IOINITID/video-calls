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
  const userVideo = useRef<HTMLVideoElement | undefined>();

  // TODO: Переименовать на audioStream и videoStream
  const [audioTracks, setAudioTracks] = useState<MediaStream | undefined>();
  const [videoTracks, setVideoTracks] = useState<MediaStream | undefined>();

  // TODO: Разделить на hook с получением стрима и hook с получением видео элемента
  const getUserMedia = async (constraints?: MediaStreamConstraints | undefined) => {
    try {
      setState('pending');

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      setState('fulfilled');
      setStream(stream);

      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    } catch (error) {
      setState('rejected');
      setError(error);

      if (userVideo.current) {
        userVideo.current.srcObject = null;
      }
    }
  };

  const getUserAudio = async (constraints?: MediaStreamConstraints | undefined) => {
    try {
      setState('pending');

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const audioStream = stream.getAudioTracks();

      setState('fulfilled');
      setAudioTracks(new MediaStream(audioStream));
    } catch (error) {
      setState('rejected');
      setError(error);
    }
  };

  const getUserVideo = async (constraints?: MediaStreamConstraints | undefined) => {
    try {
      setState('pending');

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoStream = stream.getVideoTracks();

      setState('fulfilled');
      setVideoTracks(new MediaStream(videoStream));
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

      if (userVideo.current) {
        userVideo.current.srcObject = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      stopUserMedia();
    };
  }, [stream]);

  return {
    state,
    stream,
    error,
    userVideo,
    getUserMedia,
    stopUserMedia,
    getUserAudio,
    audioTracks,
    getUserVideo,
    videoTracks,
  };
};

/**
 * Hook которые возвращает список медиаустройств по типам.
 */
export const useDeviceInfo = () => {
  const [audioInDevices, setAudioInDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioOutDevices, setAudioOutDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoInDevices, setVideoInDevices] = useState<MediaDeviceInfo[]>([]);
  const [defaultAudioInDevice, setDefaultAudioInDevice] = useState<string>('');
  const [defaultAudioOutDevice, setDefaultAudioOutDevice] = useState<string>('');
  const [defaultVideoInDevice, setDefaultVideoInDevice] = useState<string>('');

  const getDeviceInfo = () => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const audioInDevices = devices.filter((device) => device.kind === 'audioinput');
        const audioOutDevices = devices.filter((device) => device.kind === 'audiooutput');
        const videoInDevices = devices.filter((device) => device.kind === 'videoinput');

        setAudioInDevices(audioInDevices);
        setDefaultAudioInDevice(audioInDevices[0].deviceId);

        setAudioOutDevices(audioOutDevices);
        setDefaultAudioOutDevice(audioOutDevices[0].deviceId);

        setVideoInDevices(videoInDevices);
        setDefaultVideoInDevice(videoInDevices[0].deviceId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getDeviceInfo();
  }, []);

  return {
    audioInDevices,
    audioOutDevices,
    videoInDevices,
    defaultAudioInDevice,
    defaultAudioOutDevice,
    defaultVideoInDevice,
    getDeviceInfo,
  };
};
