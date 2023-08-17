import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import AppADM from "./App-ADM";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <AppADM /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
document.title = "5F STORE";

reportWebVitals();
