import { memo } from 'react';
import { TextField as MUITextField, TextFieldProps as MUITextFieldProps } from '@mui/material';

const TextField = ({ ...props }: MUITextFieldProps) => {
  return <MUITextField {...props} />;
};

export const TextFieldMemoized = memo(TextField);
