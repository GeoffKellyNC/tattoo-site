import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import socketMiddleware from './middleware/socketMiddleware';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/root.reducer';
import { ThemeProvider } from 'styled-components';
import theme from './theme/theme';


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const isLocal = import.meta.env.VITE_REACT_APP_LOCAL_MODE;
const composeEnhancers = (isLocal && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk, socketMiddleware()))
);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
  </ThemeProvider>
);
