/* eslint-disable jsx-a11y/anchor-is-valid */
import { nanoid } from 'nanoid';
import { css } from '@linaria/core';
import { Button } from 'core/components/button';
import { AuthorizationLayout } from 'core/layouts/authorization-layout';
import { useNavigate } from 'react-router-dom';
import { Input } from 'core/components/input';
import { useState } from 'react';

const FastConnectionLogin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

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
            navigate(`/fast-connection/${nanoid()}`);
          }}
        >
          Подключиться
        </Button>
      </div>
    </AuthorizationLayout>
  );
};

export { FastConnectionLogin };
