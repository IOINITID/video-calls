import { Typography } from '@mui/material';
import { css } from '@linaria/core';
import { theme } from 'core/theme';
import { Navigation } from 'core/components/navigation';
import { UserControl } from 'core/components/user-control';

const ChannelsLayout = () => {
  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: 72px 376px 1fr;
        height: 100%;
        background-color: ${theme.palette.common.white};
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
          grid-template-rows: 72px 1fr 64px;
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
          <Typography variant="h6">Каналы</Typography>
        </div>
        {/* Список сообщений от пользователей */}
        <div
          className={css`
            margin: 28px 0;
            padding: 0 8px;
            overflow: scroll;
          `}
        >
          <div
            className={css`
              display: grid;
              row-gap: 12px;
            `}
          >
            {Array.from(Array(25).keys()).map((value) => {
              return <div key={value} />;
            })}
          </div>
        </div>
        {/* Управление пользователем */}
        <UserControl />
      </div>
      {/* Блок текстовых сообщений или видеочата */}
      <div
        className={css`
          background-color: ${theme.palette.grey[600]};
        `}
      ></div>
    </div>
  );
};

export { ChannelsLayout };
