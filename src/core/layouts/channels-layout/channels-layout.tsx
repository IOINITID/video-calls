import { Typography } from '@mui/material';
import { css } from '@emotion/css';
import { Navigation } from 'core/components/navigation';
import { UserControl } from 'core/components/user-control';

const ChannelsLayout = () => {
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
          background-color: #fefefe;
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
          background-color: #fefefe;
        `}
      >
        {/* Заголовок  */}
        <div
          className={css`
            padding: 24px 20px;
            border-bottom: 1px solid #fefefe;
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
          background-color: #fefefe;
        `}
      ></div>
    </div>
  );
};

export { ChannelsLayout };
