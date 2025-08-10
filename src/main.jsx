import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import ScrollToTopButton from './doctor/utilities/ScrollToTopButton';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  RouterProvider } from "react-router-dom";
import Router from './routes/Router';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ScrollToTopButton from './pages/doctor/utilities/ScrollToTopButton';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
      <>
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />
          <RouterProvider router={Router} />
          <ScrollToTopButton></ScrollToTopButton>
          </>
      </Provider>
  </StrictMode>,
)
