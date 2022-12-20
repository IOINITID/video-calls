import { css } from '@linaria/core';
import { ReactElement } from 'react';

const AuthorizationLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div
      className={css`
        display: grid;
        justify-content: center;
        align-items: center;
        height: 100%;
      `}
    >
      {children}
    </div>
  );
};

export { AuthorizationLayout };
