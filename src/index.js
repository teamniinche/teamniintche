import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from './stoore.js';
import './index.css';
import Teamniintche from './source.js'

// import { persistor } from './store';
//import Heade from './heade';
//import Sections from './sections';
//import MyApp from './MyApp';
//import reportWebVitals from './reportWebVitals';
//<BrowserRouter>
//</BrowserRouter>
//invariant@http://localhost:3000/static/js/bundle.js:1581:11

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate persistor={persistor}>

        <Teamniintche/>

      </PersistGate>
    </React.StrictMode>
  </Provider>
);
//<Heade />
//<Sections />
//<MyApp />

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//reportWebVitals();
