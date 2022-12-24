import { css } from '@linaria/core';
import { AuthorizationLayout } from 'core/layouts/authorization-layout';

const FastConnection = () => {
  return (
    <AuthorizationLayout>
      <div
        className={css`
          padding: 24px 48px;
          background-color: #ffffff;
          border-radius: 8px;
        `}
      >
        <p>Быстрое подключение</p>
      </div>
    </AuthorizationLayout>
  );
};

export { FastConnection };
