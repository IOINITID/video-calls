import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { theme } from '../../theme';
import { memo } from 'react';
import { userApprovalsSelector } from '../../../modules/user/store/selectors';
import { UserApprovals } from '../user-approvals';

const FriendsApprovals = () => {
  const approvals = useSelector(userApprovalsSelector);

  return (
    <Box
      sx={{
        padding: '0 8px 0 16px',
        margin: '16px 8px 16px 0',
        display: 'grid',
        alignContent: 'start',
        rowGap: '8px',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'none',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.grey[300],
          border: `1px solid ${theme.palette.grey[500]}`,
          borderRadius: '8px',
        },
      }}
    >
      {approvals.map((approval) => {
        return <UserApprovals key={approval.id} id={approval.id} name={approval.name} status={approval.status} />;
      })}
    </Box>
  );
};

export const FriendsApprovalsMemoized = memo(FriendsApprovals);
