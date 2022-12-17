import { memo, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { theme } from 'core/theme';
import { Navigation } from 'core/components/navigation';
import { UserControl } from 'core/components/user-control';
import { User } from 'core/components/user';
import { Button } from 'core/components/button';
import { Outlet, useNavigate } from 'react-router-dom';
import { axiosInstance } from 'core/utils/axios-instance';
import { TextField } from 'core/components/text-field';
import { socket } from 'core/utils/socket';
import { useDispatch, useSelector } from 'react-redux';
import { userChannelMessagesSelector, userUserSelector } from 'modules/user/store/selectors';
import { getChannelMessages } from 'core/services/get-channel-messages';

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
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '72px 376px 1fr',
        height: '100%',
        backgroundColor: theme.palette.common.white,
      }}
    >
      {/* Навигация */}
      <Box sx={{ backgroundColor: theme.palette.grey[200] }}>
        <Navigation />
      </Box>

      {/* Личные сообщения*/}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: '72px max-content 1fr 64px',
          backgroundColor: theme.palette.grey[400],
          overflow: 'hidden',
        }}
      >
        {/* Заголовок  */}
        <Box sx={{ padding: '24px 20px', borderBottom: `1px solid ${theme.palette.grey[600]}` }}>
          <Typography variant="h6">Личные сообщения</Typography>
        </Box>
        {/* Друзья */}
        <Box sx={{ padding: '16px' }}>
          <Button onClick={() => navigate('/friends/all-friends')}>Друзья</Button>
        </Box>
        {/* Список сообщений от пользователей */}
        <Box
          sx={{
            margin: '28px 4px',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'none',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.grey[300],
              border: `1px solid ${theme.palette.grey[500]}`,
              borderRadius: '8px',
            },
          }}
        >
          <Box sx={{ display: 'grid', rowGap: '12px', padding: '0 4px' }}>
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
          </Box>
        </Box>
        {/* Управление пользователем */}
        <UserControl />
      </Box>
      {/* Блок друзья */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: '1fr',
          backgroundColor: theme.palette.grey[500],
          overflow: 'hidden',
        }}
      >
        {/* Сообщения */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: '1fr max-content',
            rowGap: '16px',
            margin: '24px 16px',
            backgroundColor: theme.palette.common.white,
            borderRadius: '8px',
            padding: '16px',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              padding: '8px',
              overflow: 'hidden',
              gridTemplateRows: 'max-content 1fr',
              rowGap: '16px',
            }}
          >
            <Typography>Сообщения:</Typography>
            <Box sx={{ display: 'grid', overflow: 'scroll', rowGap: '8px', alignContent: 'start', height: '100%' }}>
              {channelMessages?.map((message) => {
                return (
                  <Box
                    key={message._id}
                    sx={{
                      padding: '8px',
                      border: '1px solid #000000',
                      display: 'grid',
                      borderRadius: '8px',
                    }}
                  >
                    <User
                      id={message._id}
                      name={message.author.name}
                      status={message.author.status}
                      email={message.author.email}
                    />
                    <Typography>{message.text}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr max-content', columnGap: '16px' }}>
            <TextField
              type="text"
              id="message"
              name="message"
              label="Сообщение"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Введите текст сообщения"
            />
            <Button onClick={handleSendMessage}>Отправить сообщение</Button>
          </Box>
        </Box>
        {/* Содержимое вкладки */}
        <Outlet />
      </Box>
    </Box>
  );
};

export const MessagesMemoized = memo(Messages);
