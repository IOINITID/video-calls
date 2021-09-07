/* eslint-disable jsx-a11y/media-has-caption */
import { css, injectGlobal } from '@emotion/css';
import { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Peer from 'simple-peer';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

const App = () => {
  const [me, setMe] = useState('');
  const [stream, setStream] = useState<any>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState<any>();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState('');
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');

  const myVideo = useRef<any>(null);
  const userVideo = useRef<any>(null);
  const connectionRef = useRef<any>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;
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

    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);

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

    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
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
  }
  `;

  return (
    <div
      className={css`
        display: grid;
        justify-content: center;
        align-items: center;
        height: 100%;
      `}
    >
      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(2, minmax(1fr, 400px));
        `}
      >
        {/* User from video stream */}
        <div>
          {stream && (
            <video
              className={css`
                width: 400px;
                height: 100%;
              `}
              playsInline
              muted
              autoPlay
              ref={myVideo}
            />
          )}
        </div>
        {/* User to video stream */}
        <div>
          {callAccepted && !callEnded ? (
            <video
              className={css`
                width: 400px;
                height: 100%;
              `}
              playsInline
              autoPlay
              ref={userVideo}
            />
          ) : null}
        </div>
      </div>

      {/* Inputs */}
      <div>
        <label htmlFor="user-from">
          <input
            type="text"
            id="user-from"
            name="user-from"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <CopyToClipboard text={me}>
          <button>Copy ID</button>
        </CopyToClipboard>
        <label htmlFor="user-to">
          <input
            type="text"
            id="user-to"
            name="user-to"
            value={idToCall}
            onChange={(event) => setIdToCall(event.target.value)}
          />
        </label>
        {callAccepted && !callEnded ? (
          <button onClick={leaveCall}>End Call</button>
        ) : (
          <button onClick={() => callUser(idToCall)}>Call</button>
        )}
        <br />
        {idToCall}
      </div>
      {/* Receiving call */}
      {receivingCall && !callAccepted ? (
        <div>
          <div>{name} is calling...</div>
          <button onClick={answerCall}>Answer</button>
        </div>
      ) : null}
    </div>
  );
};

export { App };
