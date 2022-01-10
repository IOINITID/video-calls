import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, Dashboard, Settings } from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';
import { theme } from '../../theme';

const Navigation = () => {
  const navigate = useNavigate();

  //  TODO: Добавить Drawer компонент
  return (
    <Box sx={{ display: 'grid', rowGap: '16px', padding: '16px', alignContent: 'start' }}>
      <Tooltip title="Друзья" arrow placement="right">
        <Box
          sx={{
            display: 'grid',
            padding: '8px',
            backgroundColor: theme.palette.primary.main,
            cursor: 'pointer',
            borderRadius: '8px',
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
            backgroundColor: theme.palette.primary.main,
            cursor: 'pointer',
            borderRadius: '8px',
          }}
          onClick={() => navigate('/channels')}
        >
          <Dashboard />
        </Box>
      </Tooltip>
      <Tooltip title="Профиль" arrow placement="right">
        <Box
          sx={{
            display: 'grid',
            padding: '8px',
            backgroundColor: theme.palette.primary.main,
            cursor: 'pointer',
            borderRadius: '8px',
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
