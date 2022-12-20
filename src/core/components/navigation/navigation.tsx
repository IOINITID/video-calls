/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { theme } from 'core/theme';
import { css } from '@linaria/core';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <div
      className={css`
        display: grid;
        justify-content: center;
        align-content: start;
        row-gap: 24px;
        height: 100%;
        padding: 25px 16px;
      `}
    >
      <div
        className={css`
          display: grid;
          row-gap: 16px;
        `}
      >
        <Tooltip title="Друзья" arrow placement="right">
          <div
            className={css`
              display: grid;
              justify-content: center;
              width: 40px;
              padding: 8px;
              background-color: ${theme.palette.grey[400]};
              border-radius: 8px;
              cursor: pointer;
            `}
            onClick={() => navigate('/friends')}
          >
            {/* <Group /> */}
          </div>
        </Tooltip>
        <Tooltip title="Каналы" arrow placement="right">
          <div
            className={css`
              display: grid;
              justify-content: center;
              width: 40px;
              padding: 8px;
              background-color: ${theme.palette.grey[400]};
              border-radius: 8px;
              cursor: pointer;
            `}
            onClick={() => navigate('/channels')}
          >
            {/* <Dashboard /> */}
          </div>
        </Tooltip>
      </div>
      <hr />
      <Tooltip title="Настройки" arrow placement="right">
        <div
          className={css`
            display: grid;
            justify-content: center;
            width: 40px;
            padding: 8px;
            background-color: ${theme.palette.grey[400]};
            border-radius: 8px;
            cursor: pointer;
          `}
          onClick={() => navigate('/settings')}
        >
          {/* <Settings /> */}
        </div>
      </Tooltip>
    </div>
  );
};

export const NavigationMemoized = memo(Navigation);
