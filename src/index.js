import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import { BrowserRouter } from 'react-router-dom';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

const store = createStore(reducer, middleware)


ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
          <App />
      </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);