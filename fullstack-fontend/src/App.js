<<<<<<< HEAD
import "./scss/App.scss";
import "./scss/Home.scss";
=======
import "./css/App.scss";
import "./css/Home.scss";
>>>>>>> c6b89cf1 (push-new)
import Header from "./layout/Header";
import TableXuatXu from "./components/TableXuatXu";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import Footer from "./layout/Footer";
<<<<<<< HEAD
// import View from "./components/View";
// import ViewClient from "./components/ViewClient";
=======
>>>>>>> c6b89cf1 (push-new)

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <div className="my-3">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/table-xuatXu" element={<TableXuatXu />} />
            </Routes>
          </div>
        </Container>
        <Footer />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
