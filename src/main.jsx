import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ScrollToTopButton from './doctor/utilities/ScrollToTopButton';
import DocReduxWrapper from './doctor/docProvider/DocReduxWrapper';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  RouterProvider } from "react-router-dom";
import Router from './routes/Router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <DocReduxWrapper>
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
      </DocReduxWrapper>
  </StrictMode>,
)
