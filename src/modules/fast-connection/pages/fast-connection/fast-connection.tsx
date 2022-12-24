/* eslint-disable jsx-a11y/anchor-is-valid */
import { css } from '@linaria/core';
import { VideoCard } from 'core/components/video-card';

import { AuthorizationLayout } from 'core/layouts/authorization-layout';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FastConnection = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  const video = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((value) => {
      setVideoStream(value);

      if (video.current) {
        video.current.srcObject = value;
      }
    });
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

        <p>Ваше видео:</p>

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
