import { ReactElement } from 'react';
import { css } from '@linaria/core';

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
