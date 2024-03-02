import { HashRouter } from 'react-router-dom';
import { App } from 'core/components/app';

export const Root = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
};
