/* eslint-disable jsx-a11y/media-has-caption */
import { css, injectGlobal } from '@emotion/css';
import { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Peer from 'simple-peer';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

const App = () => {
  const [me, setMe] = useState('');
  const [stream, setStream] = useState<MediaStream>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState<any>();
  const [callAcepted, setCallAcepted] = useState(false);
  const [idToCall, setIdToCall] = useState('');
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');

  const myVideo = useRef<any>();
  const userVideo = useRef<any>();
  const connectionRef = useRef<any>();

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
      setCallAcepted(true);
      peer.signal = signal;
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAcepted(true);

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
          grid-template-columns: 400px 400px;
        `}
      >
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
        <div>
          {callAcepted && !callEnded ? (
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
    </div>
  );
};

export { App };
