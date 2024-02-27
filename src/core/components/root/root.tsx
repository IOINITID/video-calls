import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { HashRouter } from 'react-router-dom';
import { store } from 'core/store';
import { theme } from 'core/theme';
import { App } from 'core/components/app';

export const Root = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
};
