import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';
import { memo } from 'react';

const Button = ({ children, ...props }: MUIButtonProps) => {
  return <MUIButton {...props}>{children}</MUIButton>;
};

export const ButtonMemoized = memo(Button);
