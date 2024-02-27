import { createTheme, colors } from '@mui/material';

const light = {
  palette: {
    primary: {
      light: '',
      main: '',
      dark: '',
    },
    secondary: {
      light: '',
      main: '',
      dark: '',
    },
    tertiary: {
      light: '',
      main: '',
      dark: '',
    },
  },
};

const dark = {
  palette: {
    primary: {
      light: '',
      main: '',
      dark: '',
    },
    secondary: {
      light: '',
      main: '',
      dark: '',
    },
    tertiary: {
      light: '',
      main: '',
      dark: '',
    },
  },
};

export const themeMode = {
  mode: {
    light,
    dark,
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      light: colors.indigo.A400,
      main: colors.indigo[500],
      dark: colors.indigo[800],
    },
  },
});
