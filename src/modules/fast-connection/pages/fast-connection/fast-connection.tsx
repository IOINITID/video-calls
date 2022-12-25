/* eslint-disable jsx-a11y/anchor-is-valid */
import { css } from '@linaria/core';
import { Button } from 'core/components/button';
import { VideoCard } from 'core/components/video-card';
import { DataConnection, Peer } from 'peerjs';
import { AuthorizationLayout } from 'core/layouts/authorization-layout';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from 'core/components/input';

const FastConnection = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const peer = useRef<Peer | null>(null);
  const connection = useRef<DataConnection | null>(null);
  const [id, setId] = useState('');
  const [peerId, setPeerId] = useState('');

  const video = useRef<HTMLVideoElement | null>(null);

  const createPeerConnection = () => {
    // peer.current = new Peer();
    // peer.current.on('open', (id) => {
    //   console.log('My peer ID is: ' + id);
    //   setId(id);
    // });
    // peer.current.on('connection', (dataConnection) => {
    //   console.log('LOGS: Peer connection event.', { dataConnection });
    //   dataConnection.on('data', (data) => {
    //     console.log('LOGS: Data connection data event.', { data });
    //   });
    //   dataConnection.on('open', () => {
    //     console.log('LOGS: Data connection open event.');
    //     // dataConnection.send('Hi from user 2');
    //   });
    // });
  };

  const connectToPeer = (id: string) => {
    // peer.current = new Peer();
    // connection.current = peer.current.connect(id);
    // if (connection.current) {
    //   connection.current.on('open', () => {
    //     console.log('LOGS: Connection open event.');
    //     if (connection.current) {
    //       connection.current.on('data', (data) => {
    //         console.log('LOGS: Connection data event.', { data });
    //       });
    //       connection.current.send('Hi.');
    //     }
    //   });
    // }
  };

  const setVideo = (isActive: boolean) => {
    if (!isActive) {
      videoStream?.getTracks().forEach((value) => {
        // value.enabled = false;
        value.stop();
      });

      setVideoStream(null);

      if (video.current) {
        video.current.srcObject = null;
      }
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((value) => {
        setVideoStream(value);

        if (video.current) {
          video.current.srcObject = value;
        }
      });
    }
  };

  useEffect(() => {
    console.log('LOGS: Mounted.');

    peer.current = new Peer({
      config: {
        iceServers: [
          { url: 'stun:stun.l.google.com:19302' },
          {
            urls: 'stun:openrelay.metered.ca:80',
          },
          {
            urls: 'turn:openrelay.metered.ca:80',
            username: 'openrelayproject',
            credential: 'openrelayproject',
          },
          {
            urls: 'turn:openrelay.metered.ca:443',
            username: 'openrelayproject',
            credential: 'openrelayproject',
          },
          {
            urls: 'turn:openrelay.metered.ca:443?transport=tcp',
            username: 'openrelayproject',
            credential: 'openrelayproject',
          },
        ],
      },
    });

    console.log('LOGS: Peer created.');

    peer.current.on('open', (id) => {
      console.log('LOGS: Peer connection open event.', { id });
      setId(id);
    });

    peer.current.on('connection', (dataConnection) => {
      console.log('LOGS: Peer connection event.', { dataConnection });

      dataConnection.on('data', (data) => {
        console.log('LOGS: Data connection data event.', { data });
      });

      dataConnection.on('open', () => {
        console.log('LOGS: Data connection open event.');
      });

      dataConnection.on('close', () => {
        console.log('LOGS: Data connection open event.');
      });

      dataConnection.on('error', (error) => {
        console.log('LOGS: Data connection error event.', { error });
      });

      dataConnection.on('iceStateChanged', (state) => {
        console.log('LOGS: Data connection iceStateChanged event.', { state });
      });
    });

    if (connection.current) {
      connection.current.on('data', (data) => {
        console.log('LOGS: Connection data event.', { data });
      });

      connection.current.on('open', () => {
        console.log('LOGS: Connection open event.');
      });

      connection.current.on('close', () => {
        console.log('LOGS: Connection close event.');
      });

      connection.current.on('error', (error) => {
        console.log('LOGS: Connection error event.', { error });
      });

      connection.current.on('iceStateChanged', (state) => {
        console.log('LOGS: Connection iceStateChanged event.', { state });
      });
    }

    // if (peerConnection.current) {
    //   peerConnection.current.on('open', (id) => {
    //     console.log('LOGS: open', { id });
    //     setId(id);
    //   });

    //   peerConnection.current.on('connection', (dataConnection) => {
    //     dataConnection.on('data', (data) => {
    //       console.log('LOGS: data', { data });
    //     });

    //     dataConnection.on('open', () => {
    //       dataConnection.send('Hi from user 2');
    //     });
    //   });
    // }

    // if (connection.current) {
    //   connection.current.on('open', () => {
    //     if (connection.current) {
    //       connection.current.send('Hi from user 1');
    //     }
    //   });
    // }

    // setInterval(() => {
    //   console.log('LOGS: peerUserOne.', peerUserOne);
    // }, 5000);
  }, []);

  return (
    <AuthorizationLayout>
      <div
        className={css`
          padding: 24px 48px;
          background-color: #ffffff;
          border-radius: 8px;
        `}
      >
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            navigate(-1);
          }}
        >
          Назад
        </a>

        <p>Подключение: {params.id}</p>
        <p>Ваше имя: {localStorage.getItem('name')}</p>
        <p>Peer id: {id}</p>
        <p>Подключиться по peer id</p>
        <Input value={peerId} onChange={(event) => setPeerId(event.target.value)} />
        <Button
          onClick={() => {
            if (peer.current) {
              connection.current = peer.current.connect(id);
            }
          }}
        >
          Подключиться
        </Button>

        {/* <Button
          onClick={() => {
            createPeerConnection();
          }}
        >
          Создать peer id
        </Button> */}

        <Button
          onClick={() => {
            if (connection.current) {
              connection.current.send('Hi');
            }
          }}
        >
          Отправить сообщение
        </Button>

        <p>Ваше видео:</p>

        <Button onClick={() => (videoStream ? setVideo(false) : setVideo(true))}>
          {videoStream ? 'Выключить видео' : 'Включить видео'}
        </Button>

        <VideoCard
          ref={video}
          className={css`
            width: 100%;
            height: 200px;
          `}
          autoPlay
          muted
        />
      </div>
    </AuthorizationLayout>
  );
};

export { FastConnection };
