import { createTheme, colors } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      light: colors.indigo.A400,
      main: colors.indigo[500],
      dark: colors.indigo[800],
    },
  },
});
