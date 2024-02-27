import { memo, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { theme } from 'core/theme';
import { Navigation } from 'core/components/navigation';
import { UserControl } from 'core/components/user-control';
import { User } from 'core/components/user';
import { Button } from 'core/components/button';
import { Outlet, useNavigate } from 'react-router-dom';
import { axiosInstance } from 'core/utils/axios-instance';
import { socket } from 'core/utils/socket';
import { useDispatch, useSelector } from 'react-redux';
import { userChannelMessagesSelector, userUserSelector } from 'modules/user/store/selectors';
import { getChannelMessages } from 'core/services/get-channel-messages';
import { Input } from '../input';
import { css } from '@emotion/css';

const Messages = () => {
  const navigate = useNavigate();

  const user = useSelector(userUserSelector);
  const dispatch = useDispatch();

  const channelMessages = useSelector(userChannelMessagesSelector);

  const [usersMessages, setUsersMessages] = useState<any[]>();
  const [message, setMessage] = useState('');
  const [channel, setChannel] = useState<string>('');

  // Добавляет сообщение в канал
  const handleSendMessage = () => {
    if (channel && message) {
      // dispatch(addMessageToChannel({ channel, message }));

      // ON-MESSAGE - событие отправки сообщения в канал
      socket.emit('on-message', channel, message, user?.id);

      setMessage('');
    }
  };

  useEffect(() => {
    const getPersonalMessage = async () => {
      const response = await axiosInstance.post('/get-personal-messages-channels');

      setUsersMessages(response.data);
    };

    // getPersonalMessage();

    // ON-CHANNEL-JOIN - событие подключения пользователей к комнате
    socket.on('on-channel-join', (message: string, channel: string) => {
      console.log('Сообщение в канале:', message);
      setChannel(channel);

      if (channel) {
        dispatch(getChannelMessages({ channel }));
      }
    });

    if (channel) {
      dispatch(getChannelMessages({ channel }));
    }

    socket.on('on-message', (channel: string) => {
      if (channel) {
        dispatch(getChannelMessages({ channel }));
      }
    });
  }, []);

  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: 72px 376px 1fr;
        height: 100%;
        background-color: #ffffff;
      `}
    >
      {/* Навигация */}
      <div
        className={css`
          background-color: ${theme.palette.grey[200]};
        `}
      >
        <Navigation />
      </div>

      {/* Личные сообщения*/}
      <div
        className={css`
          display: grid;
          grid-template-rows: 72px max-content 1fr 64px;
          overflow: hidden;
          background-color: ${theme.palette.grey[400]};
        `}
      >
        {/* Заголовок  */}
        <div
          className={css`
            padding: 24px 20px;
            border-bottom: 1px solid ${theme.palette.grey[600]};
          `}
        >
          <Typography variant="h6">Личные сообщения</Typography>
        </div>
        {/* Друзья */}
        <div
          className={css`
            padding: 16px;
          `}
        >
          <Button onClick={() => navigate('/friends/all-friends')}>Друзья</Button>
        </div>
        {/* Список сообщений от пользователей */}
        <div
          className={css`
            margin: 28px 4px;
            overflow-y: scroll;

            &::-webkit-scrollbar {
              width: 4px;
            }

            &::-webkit-scrollbar-track {
              background-color: none;
            }

            &::-webkit-scrollbar-thumb {
              background-color: ${theme.palette.grey[300]};
              border: 1px solid ${theme.palette.grey[500]};
              border-radius: 8px;
            }
          `}
        >
          <div
            className={css`
              display: grid;
              row-gap: 12px;
              padding: 0 4px;
            `}
          >
            {usersMessages?.map((value: any) => {
              return (
                <User
                  key={value.userData._id}
                  id={value.userData._id}
                  name={value.userData.name}
                  status={value.userData.status}
                  email={value.userData.email}
                />
              );
            })}
          </div>
        </div>
        {/* Управление пользователем */}
        <UserControl />
      </div>
      {/* Блок друзья */}
      <div
        className={css`
          display: grid;
          grid-template-rows: 1fr;
          overflow: hidden;
          background-color: ${theme.palette.grey[500]};
        `}
      >
        {/* Сообщения */}
        <div
          className={css`
            display: grid;
            grid-template-rows: 1fr max-content;
            row-gap: 16px;
            margin: 24px 16px;
            padding: 16px;
            overflow: hidden;
            background-color: ${theme.palette.common.white};
            border-radius: 8px;
          `}
        >
          <div
            className={css`
              display: grid;
              grid-template-rows: max-content 1fr;
              padding: 8px;
              row-gap: 16px;
              overflow: hidden;
            `}
          >
            <Typography>Сообщения:</Typography>
            <div
              className={css`
                display: grid;
                align-content: start;
                height: 100%;
                overflow: scroll;
                row-gap: 8px;
              `}
            >
              {channelMessages?.map((message) => {
                return (
                  <div
                    key={message._id}
                    className={css`
                      display: grid;
                      padding: 8px;
                      border: 1px solid #000000;
                      border-radius: 8px;
                    `}
                  >
                    <User
                      id={message._id}
                      name={message.author.name}
                      status={message.author.status}
                      email={message.author.email}
                    />
                    <Typography>{message.text}</Typography>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={css`
              display: grid;
              grid-template-columns: 1fr max-content;
              column-gap: 16px;
            `}
          >
            <Input
              type="text"
              id="message"
              name="message"
              // label="Сообщение"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Введите текст сообщения"
            />
            <Button onClick={handleSendMessage}>Отправить сообщение</Button>
          </div>
        </div>
        {/* Содержимое вкладки */}
        <Outlet />
      </div>
    </div>
  );
};

export const MessagesMemoized = memo(Messages);
