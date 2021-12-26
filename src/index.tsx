import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './core/store/index';
import { AppContainer } from './core/containers/app-container/app-container';

const Root = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

ReactDOM.render(<Root />, document.querySelector('.root'));
