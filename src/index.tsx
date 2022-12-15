import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/reset.css';
import { RouterProvider } from 'react-router-dom'
import router from './router';
import { Provider } from 'react-redux'
import store from './store';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>, document.getElementById('root')
);

