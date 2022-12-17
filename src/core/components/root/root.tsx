import { ThemeProvider } from '@mui/material';
import { store } from 'core/store';
import { globalStyles } from 'core/styles';
import { theme } from 'core/theme';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { App } from '../app';

const Root = () => {
  globalStyles();
  injectStyle();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <App />
          <ToastContainer />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
};

export { Root };
