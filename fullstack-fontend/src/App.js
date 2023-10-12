import "./scss/App.scss";
import "./scss/Home.scss";
import Header from "./layout/Header";
import TableXuatXu from "./components/TableXuatXu";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import Footer from "./layout/Footer";
// import View from "./components/View";
// import ViewClient from "./components/ViewClient";
=======
import Home from "./components/web-online/Home";
import { ToastContainer } from "react-toastify";
import Footer from "./layout/Footer";
import TableTaiKhoanKH from "./components/TaiKhoanKhachHang/TableTKKhachHang";
>>>>>>> main

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <div className="my-3">
            <Routes>
<<<<<<< HEAD
              <Route path="/home" element={<Home />} />
              <Route path="/table-xuatXu" element={<TableXuatXu />} />
=======
              <Route path="/" element={<Home />} />
              <Route path="/table-xuatXu" element={<TableXuatXu />} />
              <Route path="/table-taiKhoanKH" element={<TableTaiKhoanKH />} />
>>>>>>> main
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
