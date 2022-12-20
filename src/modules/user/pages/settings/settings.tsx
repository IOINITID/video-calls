import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { css } from '@linaria/core';
import { theme } from 'core/theme';
import { UserSettings } from 'modules/user/pages/settings/components/user-settings';

const Settings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // NOTE: Переадресация на страницу учетной записи
    navigate('user-account');
  }, []);

  return (
    <div
      className={css`
        display: grid;
        width: 100%;
        height: 100%;
        background-color: ${theme.palette.grey[500]};
      `}
    >
      <div
        className={css`
          display: grid;
          justify-content: center;
          grid-template-columns: 224px 740px;
          height: 100%;
          background-image: linear-gradient(to right, #43454a 50%, #5e6065 50%);
        `}
      >
        <UserSettings />
        <Outlet />
      </div>
    </div>
  );
};

export { Settings };
