import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/stable'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createHashHistory } from 'history';
// import "./web.config";

const hist = createHashHistory()
ReactDOM.render(

  <React.StrictMode>
    {/* <div style={{ backgroundColor: '#eeeeee', height: '100%' }}> */}
    <div >
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <Provider store={store}>
        <Router history={hist}>
          <div>
            <nav>
              <ul>                
                <li>
                  <Link to="/App">App</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/App">
                <App />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
