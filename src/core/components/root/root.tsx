import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from 'core/store';
import { App } from 'core/components/app';

export const Root = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  );
};
