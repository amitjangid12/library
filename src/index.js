import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import AddNewBook from './component/AddNewBook';
import store from './Redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UpdateBookDetail from './component/UpdateBookDetail';
import ErrorComponent from './component/ErrorComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/home' element={<App />} />
          <Route path='/addBook' element={<AddNewBook />} />
          <Route path='/updateData' element={<UpdateBookDetail />} />

          <Route path='*' element={<ErrorComponent />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);