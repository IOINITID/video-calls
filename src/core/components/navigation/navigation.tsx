import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, Dashboard } from '@mui/icons-material';
import { Box } from '@mui/material';
import { theme } from '../../theme';

const Navigation = () => {
  const navigate = useNavigate();

  //  TODO: Добавить Drawer компонент
  return (
    <Box sx={{ display: 'grid', rowGap: '16px', padding: '16px', alignContent: 'start' }}>
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
    </Box>
  );
};

export const NavigationMemoized = memo(Navigation);
