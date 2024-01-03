import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {BrowserRouter} from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast'
import {Provider} from "react-redux"
import store from "./stores/stores";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store} >
    <BrowserRouter>
      <div className=" absolute flex items-center justify-center left-0 top-0 right-0 bottom-0">
        <App />
        <Toaster />
      </div>
    </BrowserRouter>
  </Provider>
);
