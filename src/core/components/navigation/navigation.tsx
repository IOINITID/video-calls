import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, Dashboard, Settings } from '@mui/icons-material';
import { Box, Divider, Tooltip } from '@mui/material';
import { theme } from '../../theme';

const Navigation = () => {
  const navigate = useNavigate();

  //  TODO: Добавить Drawer компонент
  return (
    <Box
      sx={{
        display: 'grid',
        rowGap: '24px',
        height: '100%',
        alignContent: 'start',
        padding: '25px 16px',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: 'grid', rowGap: '16px' }}>
        <Tooltip title="Друзья" arrow placement="right">
          <Box
            sx={{
              display: 'grid',
              padding: '8px',
              backgroundColor: theme.palette.grey[400],
              cursor: 'pointer',
              borderRadius: '8px',
              justifyContent: 'center',
              width: '40px',
            }}
            onClick={() => navigate('/friends')}
          >
            <Group />
          </Box>
        </Tooltip>
        <Tooltip title="Каналы" arrow placement="right">
          <Box
            sx={{
              display: 'grid',
              padding: '8px',
              backgroundColor: theme.palette.grey[400],
              cursor: 'pointer',
              borderRadius: '8px',
              justifyContent: 'center',
              width: '40px',
            }}
            onClick={() => navigate('/channels')}
          >
            <Dashboard />
          </Box>
        </Tooltip>
      </Box>
      <Divider />
      <Tooltip title="Профиль" arrow placement="right">
        <Box
          sx={{
            display: 'grid',
            padding: '8px',
            backgroundColor: theme.palette.grey[400],
            cursor: 'pointer',
            borderRadius: '8px',
            justifyContent: 'center',
            width: '40px',
          }}
          onClick={() => navigate('/profile')}
        >
          <Settings />
        </Box>
      </Tooltip>
    </Box>
  );
};

export const NavigationMemoized = memo(Navigation);
