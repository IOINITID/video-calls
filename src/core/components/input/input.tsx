import { css } from '@linaria/core';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = (props: InputProps) => {
  return (
    <input
      className={css`
        padding: 8px 16px;
      `}
      {...props}
    />
  );
};

export { Input };
