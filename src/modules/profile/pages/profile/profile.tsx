import { memo, useEffect } from 'react';
import { Box } from '@mui/material';
import { theme } from 'core/theme';
import { UserSettings } from 'modules/profile/pages/profile/components/user-settings';
import { Outlet, useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('user-profile');
  }, []);

  return (
    <Box sx={{ display: 'grid', width: '100%', height: '100%', backgroundColor: theme.palette.grey[500] }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '224px 740px',
          height: '100%',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(to right, #eeeeee 50%, #9e9e9e 50%)',
        }}
      >
        <UserSettings />
        <Outlet />
      </Box>
    </Box>
  );
};

export const ProfileMemoized = memo(Profile);
