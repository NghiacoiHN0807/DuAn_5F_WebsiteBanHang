import React from "react";
import ReactDOM from "react-dom";
<<<<<<< HEAD
import App from "./App";
// import AppADM from "./App-ADM";
=======
// import App from "./App";
import AppADM from "./App-ADM";
>>>>>>> c6b89cf1 (push-new)
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <App />
      {/* <AppADM /> */}
=======
      {/* <App /> */}
      <AppADM />
>>>>>>> c6b89cf1 (push-new)
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
document.title = "5F STORE";

reportWebVitals();
