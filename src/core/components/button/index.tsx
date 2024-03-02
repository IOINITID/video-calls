import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { css } from '@emotion/css';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className={css`
        padding: 8px 16px;
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
