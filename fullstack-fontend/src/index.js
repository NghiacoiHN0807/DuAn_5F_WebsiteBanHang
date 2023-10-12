import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import AppADM from "./App-ADM";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <AppADM />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
document.title = "5F STORE";

<<<<<<< HEAD
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
=======
>>>>>>> main
reportWebVitals();
