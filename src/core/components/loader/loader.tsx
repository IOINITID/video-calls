import { memo } from 'react';
import { CircularProgress } from '@mui/material';
import { AuthorizationLayout } from '../../layouts/authorization-layout';

const Loader = () => {
  return (
    <AuthorizationLayout>
      <CircularProgress />
    </AuthorizationLayout>
  );
};

export const LoaderMemoized = memo(Loader);
