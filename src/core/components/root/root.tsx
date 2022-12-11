import { injectGlobal } from '@emotion/css';
import { ThemeProvider } from '@mui/material';
import { store } from 'core/store';
import { theme } from 'core/theme';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { App } from '../app';

const Root = () => {
  injectGlobal`
      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      html {
        box-sizing: border-box;
      }

      html,
      body,
      #root {
        height: 100%;
      }

      body {
        margin: 0;
        background: radial-gradient(105.05% 99.28% at 50% 29.72%, #8c9eff 0%, #536dfe 42.9%, #536dfe 61.7%, #3d5afe 84.71%, #304ffe 100%);
        background-repeat: no-repeat;
      }

      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        box-shadow: 0 0 0 30px #ffffff inset;
      }
    `;

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
