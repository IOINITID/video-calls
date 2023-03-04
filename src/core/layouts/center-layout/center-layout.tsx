import { ReactElement } from 'react';
import { css } from '@linaria/core';

export const CenterLayout = ({ children }: { children: ReactElement }) => {
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
