import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom"
import  rootRouter from "./reducer/reducer"
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: rootRouter
})
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
