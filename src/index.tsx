import React from 'react';
// import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/styles.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import {ThemeProvider} from './shared/ThemeContext';
import ReactDOM from 'react-dom';

// const container = document.getElementById('root')!;
// const root = createRoot(container);

const rootNode = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <Provider store ={store}>
      <ThemeProvider>
        <App/>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
rootNode);


// root.render(
//   <React.StrictMode>
//     <Provider store ={store}>
//       <ThemeProvider>
//         <App/>
//       </ThemeProvider>
//     </Provider>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
