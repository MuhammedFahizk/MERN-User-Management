import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import { routes } from './routes/routes';
import { store } from './Redux/store';

function App() {
  return (
    <Provider store={store}> 
      <RouterProvider router={routes} />
    </Provider>
  );
}

export default App;
