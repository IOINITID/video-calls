import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './core/store/index';
import { AppContainer } from './core/containers/app-container/app-container';
import { ThemeProvider } from '@mui/material';
import { theme } from './core/theme';
import { injectGlobal } from '@emotion/css';
import { HashRouter } from 'react-router-dom';

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
    .root {
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

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <AppContainer />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.querySelector('.root'));

// if (module.hot) {
//   module.hot.accept();
// }
