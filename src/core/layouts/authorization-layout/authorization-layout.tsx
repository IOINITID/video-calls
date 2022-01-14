import { Box } from '@mui/material';
import { memo, ReactElement } from 'react';

const AuthorizationLayout = ({ children }: { children: ReactElement }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      {children}
    </Box>
  );
};

export const AuthorizationLayoutMemoized = memo(AuthorizationLayout);
