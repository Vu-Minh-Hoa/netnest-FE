import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import AppRoute from './router/AppRoute';
import { persistor, store } from './state/store';

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
    <PersistGate loading={null} persistor={persistor}>
      <RouteProvider />
    </PersistGate>
  </Provider>
);

export default ReduxProvider;
