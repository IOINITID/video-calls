import { memo } from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';

const Button = ({ children, sx, ...props }: MUIButtonProps) => {
  return (
    <MUIButton disableElevation disableRipple sx={{ padding: '8px 16px', textTransform: 'initial', ...sx }} {...props}>
      {children}
    </MUIButton>
  );
};

export const ButtonMemoized = memo(Button);
