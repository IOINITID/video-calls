/* eslint-disable jsx-a11y/media-has-caption */
import { css, cx, injectGlobal } from '@emotion/css';
import { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Peer, { Instance, SignalData } from 'simple-peer';
import { io } from 'socket.io-client';
import notificationCallSound from '../../assets/notication-call-sound.mp3';

const socket = io('https://ioinitid-video-calls-server.herokuapp.com', {
  transports: ['websocket'],
});

// const socket = io('http://localhost:8080', {
//   transports: ['websocket'],
// });

const App = () => {
  const [me, setMe] = useState('');
  const [stream, setStream] = useState<MediaStream>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState<SignalData | string>('');
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState('');
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [audioInterval, setAudioInterval] = useState<any>(null);

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Instance | null>(null);
  const audioCallRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream: MediaStream) => {
      setStream(stream);

      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }
    });

    socket.on('me', (id) => {
      setMe(id);
    });

    socket.on('callUser', (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    socket.on('callEnded', () => {
      setCallEnded(true);
      setIsCalling(false);

      if (userVideo.current) {
        userVideo.current.srcObject = null;
      }

      connectionRef.current = null;
    });
  }, []);

  const callUser = (id: string) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on('stream', (stream: MediaStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    setIsCalling(false);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data) => {
      socket.emit('answerCall', {
        signal: data,
        to: caller,
      });
    });

    peer.on('stream', (stream: MediaStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal);

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    setIsCalling(false);

    connectionRef.current = null;

    clearInterval(audioInterval);

    if (audioCallRef.current) {
      audioCallRef.current.src = '';
      audioCallRef.current.pause();
      audioCallRef.current.load();
    }

    socket.close();
  };

  injectGlobal`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .root {
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #292e49, #536976);
  }
  `;

  return (
    <div
      className={css`
        display: grid;
        justify-content: center;
        align-items: center;
        grid-template-columns: 350px 1fr;
        width: 100%;
        height: 100%;
      `}
    >
      <audio ref={audioCallRef} />
      {/* Inputs */}
      <div
        className={css`
          display: grid;
          justify-content: center;
          align-content: center;
          align-items: center;
          height: 100%;
          padding: 24px;
          box-shadow: 1px 0 0 0 rgb(255 255 255 / 25%);
          row-gap: 16px;
        `}
      >
        <div
          className={css`
            display: grid;
            justify-content: center;
            align-items: center;
            grid-template-columns: 1fr 100px;
            column-gap: 16px;
          `}
        >
          <label
            className={css`
              width: 100%;
              height: 100%;
              transition: all 1s ease-in;
            `}
            htmlFor="user-from"
          >
            <input
              className={css`
                padding: 8px 16px;
                border: none;
                border-radius: 8px;
                outline: none;
              `}
              type="text"
              id="user-from"
              name="user-from"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
            />
          </label>
          <CopyToClipboard text={me}>
            <button
              className={css`
                margin: 0;
                padding: 8px 16px;
                font-size: 16px;
                font-family: sans-serif;
                color: #ffffff;
                background-color: ${name ? '#da22ff' : '#a5a5a5'};
                border: none;
                border-radius: 8px;
                cursor: ${name ? 'pointer' : 'default'};
                pointer-events: ${name ? 'all' : 'none'};

                &:hover,
                &:focus {
                  background-color: #c41ee5;
                }

                &:active {
                  background-color: #dd38ff;
                }
              `}
            >
              Copy ID
            </button>
          </CopyToClipboard>
        </div>
        <div
          className={css`
            display: grid;
            justify-content: center;
            align-items: center;
            grid-template-columns: 1fr 100px;
            column-gap: 16px;
          `}
        >
          <label
            className={css`
              width: 100%;
              height: 100%;
            `}
            htmlFor="user-to"
          >
            <input
              className={css`
                padding: 8px 16px;
                border: none;
                border-radius: 8px;
                outline: none;
              `}
              type="text"
              id="user-to"
              name="user-to"
              value={idToCall}
              onChange={(event) => setIdToCall(event.target.value)}
              placeholder="ID of user to call"
            />
          </label>
          {callAccepted && !callEnded ? (
            <button
              className={css`
                margin: 0;
                padding: 8px 16px;
                font-size: 16px;
                font-family: sans-serif;
                color: #ffffff;
                background-color: #ff3232;
                border: none;
                border-radius: 8px;
                cursor: pointer;

                &:hover,
                &:focus {
                  background-color: #e52d2d;
                }

                &:active {
                  background-color: #ff4646;
                }
              `}
              onClick={leaveCall}
            >
              End Call
            </button>
          ) : (
            <button
              className={css`
                margin: 0;
                padding: 8px 16px;
                font-size: 16px;
                font-family: sans-serif;
                color: #ffffff;
                background-color: ${idToCall ? '#56cb56' : '#a5a5a5'};
                border: none;
                border-radius: 8px;
                cursor: ${idToCall ? 'pointer' : 'default'};
                pointer-events: ${idToCall ? 'all' : 'none'};

                &:hover,
                &:focus {
                  background-color: #84d984;
                }

                &:active {
                  background-color: #6bbf6b;
                }
              `}
              onClick={() => {
                if (audioCallRef.current) {
                  audioCallRef.current.src = notificationCallSound;
                  audioCallRef.current.play();
                  audioCallRef.current.volume = 0.5;
                }

                setAudioInterval(
                  setInterval(() => {
                    if (audioCallRef.current) {
                      audioCallRef.current.src = notificationCallSound;
                      audioCallRef.current.play();
                      audioCallRef.current.volume = 0.5;
                    }
                  }, 2000)
                );
                callUser(idToCall);
                setIsCalling(true);
              }}
            >
              Call
            </button>
          )}
        </div>
      </div>
      {/* Receiving call */}
      <div
        className={css`
          position: relative;
          display: grid;
          width: 100%;
          height: 100%;
        `}
      >
        {/* User from video stream */}
        <div
          className={css`
            padding: 80px;
          `}
        >
          {stream && (
            <video
              className={cx(
                css`
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  border-radius: 24px;
                `,
                callAccepted &&
                  !callEnded &&
                  css`
                    position: absolute;
                    top: 104px;
                    left: 104px;
                    width: 160px;
                    height: 104px;
                    border-radius: 24px;
                    transition: all 1s ease-in;
                  `
              )}
              playsInline
              muted
              autoPlay
              ref={myVideo}
            />
          )}
          {/* User to video stream */}
          {callAccepted && !callEnded ? (
            <video
              className={css`
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 24px;
              `}
              playsInline
              autoPlay
              ref={userVideo}
            />
          ) : null}
          {/* Is calling text */}
          {isCalling && !callAccepted ? (
            <div
              className={css`
                position: absolute;
                bottom: 104px;
                left: 50%;
                display: grid;
                row-gap: 24px;
                transform: translateX(-50%);
              `}
            >
              <div
                className={css`
                  font-size: 24px;
                  font-family: sans-serif;
                  color: #ffffff;
                `}
              >
                Is calling...
              </div>
              <button
                className={css`
                  padding: 8px 16px;
                  font-size: 16px;
                  font-family: sans-serif;
                  color: #ffffff;
                  background-color: #ff3232;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;

                  &:hover,
                  &:focus {
                    background-color: #e52d2d;
                  }

                  &:active {
                    background-color: #ff4646;
                  }
                `}
                onClick={leaveCall}
              >
                Cancel
              </button>
            </div>
          ) : null}
          {/* Answer Call button */}
          {receivingCall && !callAccepted ? (
            <div
              className={css`
                position: absolute;
                bottom: 104px;
                left: 50%;
                display: grid;
                row-gap: 24px;
                transform: translateX(-50%);
              `}
            >
              <div
                className={css`
                  font-size: 24px;
                  font-family: sans-serif;
                  color: #ffffff;
                `}
              >
                {name ? name : 'Unknown'} is calling...
              </div>
              <button
                className={css`
                  padding: 8px 16px;
                  font-size: 16px;
                  font-family: sans-serif;
                  color: #ffffff;
                  background-color: #56cb56;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;

                  &:hover,
                  &:focus {
                    background-color: #84d984;
                  }

                  &:active {
                    background-color: #6bbf6b;
                  }
                `}
                onClick={answerCall}
              >
                Answer
              </button>
            </div>
          ) : null}
          {/* End Call button */}
          {callAccepted && !callEnded ? (
            <div
              className={css`
                position: absolute;
                bottom: 104px;
                left: 50%;
                display: grid;
                row-gap: 24px;
                transform: translateX(-50%);
              `}
            >
              <button
                className={css`
                  padding: 8px 16px;
                  font-size: 16px;
                  font-family: sans-serif;
                  color: #ffffff;
                  background-color: #ff3232;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;

                  &:hover,
                  &:focus {
                    background-color: #e52d2d;
                  }

                  &:active {
                    background-color: #ff4646;
                  }
                `}
                onClick={leaveCall}
              >
                End Call
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { App };
