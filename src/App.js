import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoute from './router/AppRoute';
import { store } from './store';

function App() {
  return (
    <>
      <AppRoute />
    </>
  );
}

const RouteProvider = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const ReduxProvider = () => (
  <Provider store={store}>
    <RouteProvider />
  </Provider>
);

export default ReduxProvider;
