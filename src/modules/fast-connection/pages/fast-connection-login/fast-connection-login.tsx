/* eslint-disable jsx-a11y/anchor-is-valid */
import { css } from '@linaria/core';
import { Button } from 'core/components/button';
import { AuthorizationLayout } from 'core/layouts/authorization-layout';
import { useNavigate } from 'react-router-dom';
import { Input } from 'core/components/input';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
// import { Peer } from 'peerjs';

const FastConnectionLogin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  // const [id, setId] = useState('');

  // const peer = new Peer();

  useEffect(() => {
    console.log('LOGS: Mounted.');

    // peer.on('open', (id) => {
    //   console.log('LOGS: open', { id });
    //   setId(id);
    //   console.log('LOGS: peer id', peer.id);
    // });

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
            navigate('/');
          }}
        >
          Назад
        </a>
        <p>Быстрое подключение</p>
        <p>Введите ваше имя</p>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            localStorage.setItem('name', event.target.value);
          }}
        />

        <Button
          onClick={() => {
            console.log('LOGS: Connection.');
            // if (id) {
            navigate(`/fast-connection/${nanoid()}`);
            // }
          }}
        >
          Подключиться
        </Button>
      </div>
    </AuthorizationLayout>
  );
};

export { FastConnectionLogin };
