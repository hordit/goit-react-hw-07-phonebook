import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    black: '#212121',
    white: '#ffffff',
    borderAccent: '#85b4ec',
    backgroundButtoHover: '#126de8',
  },
  border: '1px solid #dddedf',
  borderRadius: '5px',
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
