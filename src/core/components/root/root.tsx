import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { HashRouter } from 'react-router-dom';
import { store } from 'core/store';
import { globalStyles } from 'core/styles';
import { theme } from 'core/theme';
import { App } from 'core/components/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
  globalStyles();

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
